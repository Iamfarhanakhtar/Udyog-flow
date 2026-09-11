import assert from 'node:assert/strict';
import fs from 'node:fs';

// Automatically load .env if present and not already loaded
if (!process.env.DATABASE_URL && fs.existsSync('.env')) {
  try {
    process.loadEnvFile?.('.env');
  } catch {
    // Ignore if not supported
  }
}

import { getAllNiches, getNicheBySlug } from '../services/nicheService';
import {
  getBlueprintByNicheSlug,
  validateLicenseDependencies,
} from '../services/blueprintService';
import {
  createBusiness,
  getBusinessById,
  getPersonalizedBlueprint,
} from '../services/businessService';

async function runTrack2Tests() {
  console.log('🧪 Starting UdyogFlow Track-2 Test Suite...\n');
  let passed = 0;
  let total = 0;

  function test(name: string, fn: () => Promise<void> | void) {
    total++;
    try {
      fn();
      console.log(`  ✓ Scenario ${total}: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ Scenario ${total} FAILED: ${name}`);
      console.error('     Error:', err);
      process.exitCode = 1;
    }
  }

  async function testAsync(name: string, fn: () => Promise<void>) {
    total++;
    try {
      await fn();
      console.log(`  ✓ Scenario ${total}: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ Scenario ${total} FAILED: ${name}`);
      console.error('     Error:', err);
      process.exitCode = 1;
    }
  }

  // 1. Niches count check
  await testAsync('getAllNiches returns exactly 5 micro-niches', async () => {
    const res = await getAllNiches();
    assert.strictEqual(res.data.length, 5, 'Must return exactly 5 micro-niches');
    const slugs = res.data.map((n) => n.slug);
    assert.ok(slugs.includes('cloud-kitchen'));
    assert.ok(slugs.includes('bakery-confectionery'));
    assert.ok(slugs.includes('dairy-cold-storage'));
    assert.ok(slugs.includes('craft-beverage'));
    assert.ok(slugs.includes('frozen-foods'));
  });

  // 2. Cloud Kitchen micro-niche attributes
  await testAsync('Cloud Kitchen micro-niche exists with correct attributes', async () => {
    const res = await getNicheBySlug('cloud-kitchen');
    assert.ok(res.data, 'Cloud kitchen niche must exist');
    assert.strictEqual(res.data?.name, 'Cloud Kitchen');
    assert.strictEqual(res.data?.macroCategory, 'Food Processing & Hospitality');
    assert.strictEqual(res.data?.estimatedDays, 30);
  });

  // 3. Blueprint retrieval
  await testAsync('Cloud Kitchen blueprint returns licenses, documents, and schemes', async () => {
    const res = await getBlueprintByNicheSlug('cloud-kitchen');
    assert.ok(res.data, 'Blueprint must exist for cloud-kitchen');
    assert.ok(res.data?.blueprint.title.includes('Cloud Kitchen'));
    assert.ok(res.data?.licenses.length >= 4, 'Must have at least 4 prototype licenses');
    assert.ok(res.data?.schemes.length >= 3, 'Must have at least 3 government schemes');
  });

  // 4. Dependency relationships preserved
  await testAsync('License dependencies preserve prototype roadmap order', async () => {
    const res = await getBlueprintByNicheSlug('cloud-kitchen');
    assert.ok(res.data);
    const tradeLicense = res.data.licenses.find((l) => l.slug === 'municipal-trade-license');
    assert.ok(tradeLicense, 'Municipal Trade License must exist');
    assert.ok(
      tradeLicense.prerequisites.includes('fssai-state-license'),
      'Municipal Trade License must depend on FSSAI State License'
    );
    assert.ok(
      tradeLicense.prerequisites.includes('fire-safety-noc'),
      'Municipal Trade License must depend on Fire Safety NOC'
    );
  });

  // 5. Provenance assertion (sourceAuthority, sourceUrl, lastVerified)
  await testAsync('Provenance fields (sourceAuthority, sourceUrl, lastVerified) exist on all items', async () => {
    const res = await getBlueprintByNicheSlug('cloud-kitchen');
    assert.ok(res.data);

    // Verify all licenses have provenance
    for (const lic of res.data.licenses) {
      assert.ok(lic.sourceAuthority && lic.sourceAuthority.length > 0, `License ${lic.slug} missing sourceAuthority`);
      assert.ok(lic.sourceUrl && lic.sourceUrl.startsWith('http'), `License ${lic.slug} missing or invalid sourceUrl`);
      assert.ok(lic.lastVerified && lic.lastVerified.match(/^\d{4}-\d{2}-\d{2}$/), `License ${lic.slug} missing valid lastVerified`);
    }

    // Verify all document requirements have provenance
    const allDocs = Object.values(res.data.documentVault).flat();
    assert.ok(allDocs.length >= 5, 'Document vault must have at least 5 documents');
    for (const doc of allDocs) {
      assert.ok(doc.source && doc.source.length > 0, `Doc ${doc.slug} missing source`);
      assert.ok(doc.sourceUrl && doc.sourceUrl.startsWith('http'), `Doc ${doc.slug} missing or invalid sourceUrl`);
      assert.ok(doc.lastVerified && doc.lastVerified.match(/^\d{4}-\d{2}-\d{2}$/), `Doc ${doc.slug} missing valid lastVerified`);
    }

    // Verify schemes have provenance
    for (const scheme of res.data.schemes) {
      assert.ok(scheme.sourceAuthority && scheme.sourceAuthority.length > 0, `Scheme ${scheme.name} missing sourceAuthority`);
      assert.ok(scheme.sourceUrl && scheme.sourceUrl.startsWith('http'), `Scheme ${scheme.name} missing or invalid sourceUrl`);
      assert.ok(scheme.lastVerified && scheme.lastVerified.match(/^\d{4}-\d{2}-\d{2}$/), `Scheme ${scheme.name} missing valid lastVerified`);
    }
  });

  // 6. Business creation
  await testAsync('Business creation succeeds with valid data', async () => {
    const input = {
      legalName: 'Spice Junction Kitchens',
      macroNiche: 'Food Processing & Hospitality',
      microNiche: 'cloud-kitchen',
      state: 'Maharashtra',
      city: 'Mumbai',
      pincode: '400069',
      entityType: 'Private Limited',
      userId: 'usr_mumbai_101',
    };
    const res = await createBusiness(input);
    assert.strictEqual(res.status, 'created');
    assert.ok(res.businessId.startsWith('biz_'));
    assert.strictEqual(res.data.legalName, 'Spice Junction Kitchens');
    assert.strictEqual(res.data.pincode, '400069');
  });

  // 7. Business retrieval
  await testAsync('Business retrieval by ID returns persisted profile', async () => {
    const input = {
      businessId: 'biz_test_retrieve_01',
      legalName: 'Test Retrieval Kitchen',
      state: 'Karnataka',
      city: 'Bengaluru',
      pincode: '560001',
      entityType: 'LLP',
    };
    await createBusiness(input);
    const retrieved = await getBusinessById('biz_test_retrieve_01');
    assert.ok(retrieved.data, 'Must retrieve created business');
    assert.strictEqual(retrieved.data?.legalName, 'Test Retrieval Kitchen');
    assert.strictEqual(retrieved.data?.city, 'Bengaluru');
  });

  // 8. Personalized blueprint generation
  await testAsync('Personalized blueprint merges business context and compliance roadmap', async () => {
    const input = {
      businessId: 'biz_personalized_test',
      legalName: "Rohan's Cloud Kitchen",
      state: 'Maharashtra',
      city: 'Mumbai',
      pincode: '400069',
      entityType: 'Sole Proprietorship',
    };
    await createBusiness(input);
    const res = await getPersonalizedBlueprint('biz_personalized_test');
    assert.ok(res.data, 'Personalized blueprint must exist');
    assert.strictEqual(res.data?.business.legalName, "Rohan's Cloud Kitchen");
    assert.strictEqual(res.data?.business.location.city, 'Mumbai');
    assert.strictEqual(res.data?.personalizedStages.length, 4);
    assert.ok(res.data?.personalizedStages[1].description.includes('Mumbai'));
  });

  // 9. Invalid micro-niche returns null
  await testAsync('Invalid or unconfigured micro-niche returns null', async () => {
    const nonExistent = await getBlueprintByNicheSlug('quantum-computing');
    assert.strictEqual(nonExistent.data, null);
    const nonExistentNiche = await getNicheBySlug('quantum-computing');
    assert.strictEqual(nonExistentNiche.data, null);
  });

  // 10. Validation error on invalid pincode
  await testAsync('Business creation rejects invalid 5-digit or non-numeric pincode', async () => {
    await assert.rejects(
      async () => {
        await createBusiness({
          legalName: 'Invalid Pincode Cafe',
          state: 'Delhi',
          city: 'New Delhi',
          pincode: '11000', // 5 digits
          entityType: 'Sole Proprietorship',
        });
      },
      {
        name: 'Error',
        message: /pincode must be a valid 6-digit Indian postal code/,
      }
    );
  });

  // 11. Self-reference & circular dependency validation
  await testAsync('Cycle detection rejects self-referential and circular dependencies', async () => {
    // A cannot depend on A
    const selfCheck = await validateLicenseDependencies('fssai-state-license', 'fssai-state-license');
    assert.strictEqual(selfCheck.valid, false);
    assert.ok(selfCheck.error?.includes('cannot depend on itself'));

    // Existing: municipal-trade-license -> fssai-state-license
    // Adding fssai-state-license -> municipal-trade-license would form a cycle!
    const cycleCheck = await validateLicenseDependencies(
      'fssai-state-license',
      'municipal-trade-license',
      [
        { licenseSlug: 'municipal-trade-license', prerequisiteSlug: 'fssai-state-license' },
      ]
    );
    assert.strictEqual(cycleCheck.valid, false);
    assert.ok(cycleCheck.error?.includes('Circular dependency detected'));

    // Valid dependency: fssai-state-license -> base-identity
    const validCheck = await validateLicenseDependencies(
      'fssai-state-license',
      'base-identity-kyc',
      [
        { licenseSlug: 'municipal-trade-license', prerequisiteSlug: 'fssai-state-license' },
      ]
    );
    assert.strictEqual(validCheck.valid, true);
  });

  console.log(`\n========================================`);
  console.log(`🏁 Test Results: ${passed} / ${total} Scenarios Passed`);
  console.log(`========================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runTrack2Tests().catch((err) => {
  console.error('Fatal Test Suite Error:', err);
  process.exit(1);
});

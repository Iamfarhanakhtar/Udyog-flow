-- CreateTable
CREATE TABLE "UserBusiness" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "userId" TEXT,
    "legalName" TEXT NOT NULL,
    "macroNiche" TEXT NOT NULL,
    "microNiche" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MicroNiche" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "macroCategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconName" TEXT,
    "estimatedDays" INTEGER,
    "initialCapex" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MicroNiche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NicheBlueprint" (
    "id" TEXT NOT NULL,
    "microNicheId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "setupSummary" TEXT NOT NULL,
    "recommendedNextStep" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NicheBlueprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseRequirement" (
    "id" TEXT NOT NULL,
    "microNicheId" TEXT NOT NULL,
    "licenseName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "issuingAuthority" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'MANDATORY',
    "priority" INTEGER NOT NULL DEFAULT 1,
    "sla" TEXT,
    "sourceAuthority" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "lastVerified" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LicenseRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseDependency" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "prerequisiteLicenseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LicenseDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "lastVerified" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseDocumentRequirement" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "documentRequirementId" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LicenseDocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovernmentScheme" (
    "id" TEXT NOT NULL,
    "microNicheId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sourceAuthority" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "lastVerified" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GovernmentScheme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBusiness_businessId_key" ON "UserBusiness"("businessId");

-- CreateIndex
CREATE INDEX "UserBusiness_businessId_idx" ON "UserBusiness"("businessId");

-- CreateIndex
CREATE INDEX "UserBusiness_microNiche_idx" ON "UserBusiness"("microNiche");

-- CreateIndex
CREATE UNIQUE INDEX "MicroNiche_slug_key" ON "MicroNiche"("slug");

-- CreateIndex
CREATE INDEX "MicroNiche_slug_idx" ON "MicroNiche"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NicheBlueprint_microNicheId_key" ON "NicheBlueprint"("microNicheId");

-- CreateIndex
CREATE INDEX "NicheBlueprint_microNicheId_idx" ON "NicheBlueprint"("microNicheId");

-- CreateIndex
CREATE INDEX "LicenseRequirement_microNicheId_idx" ON "LicenseRequirement"("microNicheId");

-- CreateIndex
CREATE UNIQUE INDEX "LicenseRequirement_slug_microNicheId_key" ON "LicenseRequirement"("slug", "microNicheId");

-- CreateIndex
CREATE INDEX "LicenseDependency_licenseId_idx" ON "LicenseDependency"("licenseId");

-- CreateIndex
CREATE INDEX "LicenseDependency_prerequisiteLicenseId_idx" ON "LicenseDependency"("prerequisiteLicenseId");

-- CreateIndex
CREATE UNIQUE INDEX "LicenseDependency_licenseId_prerequisiteLicenseId_key" ON "LicenseDependency"("licenseId", "prerequisiteLicenseId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRequirement_slug_key" ON "DocumentRequirement"("slug");

-- CreateIndex
CREATE INDEX "DocumentRequirement_slug_idx" ON "DocumentRequirement"("slug");

-- CreateIndex
CREATE INDEX "DocumentRequirement_category_idx" ON "DocumentRequirement"("category");

-- CreateIndex
CREATE INDEX "LicenseDocumentRequirement_licenseId_idx" ON "LicenseDocumentRequirement"("licenseId");

-- CreateIndex
CREATE INDEX "LicenseDocumentRequirement_documentRequirementId_idx" ON "LicenseDocumentRequirement"("documentRequirementId");

-- CreateIndex
CREATE UNIQUE INDEX "LicenseDocumentRequirement_licenseId_documentRequirementId_key" ON "LicenseDocumentRequirement"("licenseId", "documentRequirementId");

-- CreateIndex
CREATE INDEX "GovernmentScheme_microNicheId_idx" ON "GovernmentScheme"("microNicheId");

-- AddForeignKey
ALTER TABLE "NicheBlueprint" ADD CONSTRAINT "NicheBlueprint_microNicheId_fkey" FOREIGN KEY ("microNicheId") REFERENCES "MicroNiche"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseRequirement" ADD CONSTRAINT "LicenseRequirement_microNicheId_fkey" FOREIGN KEY ("microNicheId") REFERENCES "MicroNiche"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseDependency" ADD CONSTRAINT "LicenseDependency_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "LicenseRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseDependency" ADD CONSTRAINT "LicenseDependency_prerequisiteLicenseId_fkey" FOREIGN KEY ("prerequisiteLicenseId") REFERENCES "LicenseRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseDocumentRequirement" ADD CONSTRAINT "LicenseDocumentRequirement_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "LicenseRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseDocumentRequirement" ADD CONSTRAINT "LicenseDocumentRequirement_documentRequirementId_fkey" FOREIGN KEY ("documentRequirementId") REFERENCES "DocumentRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovernmentScheme" ADD CONSTRAINT "GovernmentScheme_microNicheId_fkey" FOREIGN KEY ("microNicheId") REFERENCES "MicroNiche"("id") ON DELETE CASCADE ON UPDATE CASCADE;

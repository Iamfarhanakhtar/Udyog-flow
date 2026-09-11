"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Layers,
  ArrowUpRight,
  Sparkles,
  Check,
  Building2,
  MapPin,
  FileCheck,
  Zap,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useBusiness } from "@/context/BusinessContext";
import {
  BusinessCategory,
  EntityType,
  BusinessStage,
  BusinessProfile,
} from "@/types/compliance";
import {
  DEMO_BUSINESS_PROFILE,
  CATEGORY_NICHES_MAP,
} from "@/lib/data/demoBusiness";

const CATEGORIES: BusinessCategory[] = [
  "Food & Beverage",
  "Manufacturing",
  "Retail & E-commerce",
  "Services",
  "Healthcare",
  "Construction & Real Estate",
  "Education",
  "Logistics & Transportation",
  "Agriculture & Agri-business",
  "Other",
];

const ENTITY_TYPES: { type: EntityType; subtitle: string }[] = [
  { type: "Sole Proprietorship", subtitle: "Single owner, minimal initial compliance" },
  { type: "Partnership", subtitle: "2+ partners, partnership deed required" },
  { type: "LLP", subtitle: "Limited liability, MCA annual statutory filings" },
  { type: "Private Limited Company", subtitle: "Share capital, ROC scrutiny, investor-ready" },
  { type: "One Person Company", subtitle: "Single director corporate structure" },
  { type: "Other", subtitle: "Trust, Society, Section 8, or Custom" },
];

const STAGES: { stage: BusinessStage; tag: string }[] = [
  { stage: "Just exploring", tag: "Feasibility check" },
  { stage: "Planning to start", tag: "Setup roadmap" },
  { stage: "Already operating", tag: "Retrofit & audits" },
  { stage: "Expanding", tag: "Multi-branch scaling" },
];

const SYNTHESIS_STEPS = [
  "Understanding your business structure & scale",
  "Mapping Maharashtra & MCGM municipal requirements",
  "Building statutory document dependency chains",
  "Identifying mandatory operating registrations",
  "Matching relevant state & central credit schemes",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { updateProfile, simulateGeneration } = useBusiness();

  // Form State
  const [businessName, setBusinessName] = useState<string>("Rohan's Cloud Kitchen");
  const [category, setCategory] = useState<BusinessCategory>("Food & Beverage");
  const [microNiche, setMicroNiche] = useState<string>("Cloud Kitchen");
  const [state, setState] = useState<string>("Maharashtra");
  const [city, setCity] = useState<string>("Mumbai");
  const [district, setDistrict] = useState<string>("Mumbai Suburban (MCGM Ward K-West)");
  const [pinCode, setPinCode] = useState<string>("400069");
  const [entityType, setEntityType] = useState<EntityType>("Sole Proprietorship");
  const [businessStage, setBusinessStage] = useState<BusinessStage>("Planning to start");

  // Synthesis Modal State
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const availableNiches = CATEGORY_NICHES_MAP[category] || ["General"];

  const handleCategoryChange = (newCat: BusinessCategory) => {
    setCategory(newCat);
    const niches = CATEGORY_NICHES_MAP[newCat] || ["General"];
    setMicroNiche(niches[0]);
  };

  const handleLoadDemo = () => {
    setBusinessName(DEMO_BUSINESS_PROFILE.businessName);
    setCategory(DEMO_BUSINESS_PROFILE.category);
    setMicroNiche(DEMO_BUSINESS_PROFILE.microNiche);
    setState(DEMO_BUSINESS_PROFILE.state);
    setCity(DEMO_BUSINESS_PROFILE.city);
    setDistrict(DEMO_BUSINESS_PROFILE.district || "Mumbai Suburban (MCGM Ward K-West)");
    setPinCode(DEMO_BUSINESS_PROFILE.pinCode);
    setEntityType(DEMO_BUSINESS_PROFILE.entityType);
    setBusinessStage(DEMO_BUSINESS_PROFILE.businessStage);
  };

  const handleGenerate = async () => {
    const profileToSave: BusinessProfile = {
      businessName: businessName.trim() || "Rohan's Cloud Kitchen",
      category,
      microNiche,
      state,
      city,
      district,
      pinCode,
      entityType,
      businessStage,
      jurisdictionLabel: `${city}, ${state} (MCGM Ward K-West)`,
      modelLabel: `${microNiche} Facility`,
    };

    setIsSynthesizing(true);

    // Animate the 5 synthesis steps across 1.5 seconds
    const stepInterval = 1500 / SYNTHESIS_STEPS.length;
    for (let i = 0; i < SYNTHESIS_STEPS.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((res) => setTimeout(res, stepInterval));
    }

    await updateProfile(profileToSave);
    await simulateGeneration();
    router.push("/blueprint");
  };

  return (
    <main className="w-full bg-surface min-h-screen flex items-center justify-center p-space-gutter">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-space-gutter py-space-xl">
        {/* Minimalist Stepper Header */}
        <header className="w-full flex items-center justify-between pb-space-lg mb-space-xl border-b border-surface-container-high/60">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-bold shadow-sm">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-md text-headline-sm text-on-surface tracking-tight font-bold">
                UdyogFlow
              </span>
              <span className="font-code-sm text-code-sm text-secondary px-space-xs py-0.5 rounded bg-surface-container font-medium">
                SYSTEM v2.4
              </span>
            </div>
          </div>

          {/* Stepper Indicator & Demo Auto-loader */}
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-1.5 rounded-full shadow-sm border border-surface-container-high/50">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span className="w-2 h-2 rounded-full bg-primary-container/80"></span>
                <span className="w-2 h-2 rounded-full bg-primary-container/60"></span>
                <span className="w-2 h-2 rounded-full bg-primary-container/40"></span>
                <span className="w-2 h-2 rounded-full bg-surface-variant"></span>
              </div>
              <span className="text-label-sm font-label-sm text-on-surface-variant ml-1 font-semibold tracking-wider uppercase">
                Guided Setup
              </span>
            </div>

            <button
              type="button"
              onClick={handleLoadDemo}
              className="text-label-md font-label-md text-primary-container hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1 group font-semibold cursor-pointer"
            >
              <span>Explore Demo (Rohan&apos;s Cloud Kitchen)</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </header>

        {/* Editorial Lead-in */}
        <div className="max-w-3xl mb-space-xl">
          <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-secondary-container/60 text-on-secondary-container text-label-sm font-label-sm mb-space-sm font-semibold">
            <Zap className="w-3.5 h-3.5 text-secondary" />
            <span>Autonomous Compliance Synthesis</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold mb-space-sm">
            Start your business without the compliance confusion.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Tell us what you&apos;re building. UdyogFlow creates a hyper-localized roadmap of registrations, statutory documents, and municipal approvals.
          </p>
        </div>

        {/* Dynamic 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Progressive Setup Sections (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-xl">
            {/* Section 1: Industry Selection */}
            <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-label-sm font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    What are you building?
                  </h2>
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                  {category}
                </span>
              </div>

              {/* Business Name Input */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                  Business Entity Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Rohan's Cloud Kitchen"
                  className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high/80 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                />
              </div>

              {/* Industry Category Grid */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-2">
                  Primary Sector
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className={`text-left p-2.5 rounded-lg border text-label-sm font-label-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-sm font-semibold"
                            : "bg-surface-container-low border-surface-container-high/60 text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Niche Selector */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-2">
                  Micro-Niche Specification
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableNiches.map((niche) => {
                    const isSelected = microNiche === niche;
                    return (
                      <button
                        key={niche}
                        type="button"
                        onClick={() => setMicroNiche(niche)}
                        className={`p-2.5 rounded-lg border text-center text-label-sm font-label-sm transition-all ${
                          isSelected
                            ? "bg-primary-container text-white border-primary-container shadow-sm font-semibold"
                            : "bg-surface-container-low border-surface-container-high/60 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                        }`}
                      >
                        {niche}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Section 2: Location & Entity Architecture */}
            <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-label-sm font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Location & Entity Architecture
                  </h2>
                </div>
                <span className="text-label-sm font-label-sm text-secondary font-semibold">
                  MCGM Ward Identified
                </span>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high/80 focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                    City / District
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high/80 focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface font-medium mb-1.5">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-high/80 focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </div>
              <p className="text-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>
                  Physical location determines state-specific licenses (e.g. Maharashtra FoSCoS) and municipal ward jurisdiction (BMC Ward K-West).
                </span>
              </p>

              {/* Entity Type Selector */}
              <div className="pt-space-xs">
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-2">
                  Legal Entity Structure
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ENTITY_TYPES.map((ent) => {
                    const isSelected = entityType === ent.type;
                    return (
                      <button
                        key={ent.type}
                        type="button"
                        onClick={() => setEntityType(ent.type)}
                        className={`text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? "bg-primary/5 border-primary ring-1 ring-primary"
                            : "bg-surface-container-low border-surface-container-high/60 hover:bg-surface-container"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-label-md font-label-md font-semibold ${isSelected ? "text-primary" : "text-on-surface"}`}>
                            {ent.type}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </div>
                        <span className="text-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                          {ent.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Business Stage Selector */}
              <div className="pt-space-xs">
                <label className="block text-label-md font-label-md text-on-surface font-medium mb-2">
                  Execution Stage
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STAGES.map((st) => {
                    const isSelected = businessStage === st.stage;
                    return (
                      <button
                        key={st.stage}
                        type="button"
                        onClick={() => setBusinessStage(st.stage)}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-sm font-semibold"
                            : "bg-surface-container-low border-surface-container-high/60 text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        <span className="block text-label-sm font-label-sm font-medium">
                          {st.stage}
                        </span>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-primary-fixed" : "text-on-surface-variant"}`}>
                          {st.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Review & Live Engine Simulation (5 cols, sticky) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg sticky top-6">
            {/* Section 3: Clean Review Summary Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Configured Profile
                  </h3>
                </div>
                <span className="font-code-sm text-code-sm text-secondary bg-secondary-container/60 px-2.5 py-0.5 rounded-full font-semibold">
                  Valid Inputs
                </span>
              </div>

              <dl className="flex flex-col gap-space-xs font-body-md text-body-md">
                <div className="flex items-center justify-between py-2 px-space-sm rounded-lg bg-surface-container-low">
                  <dt className="text-on-surface-variant font-medium text-body-sm">Industry</dt>
                  <dd className="flex items-center gap-space-sm">
                    <span className="font-semibold text-on-surface text-label-md">{category}</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2 px-space-sm rounded-lg bg-surface-container-low">
                  <dt className="text-on-surface-variant font-medium text-body-sm">Sub-niche</dt>
                  <dd className="flex items-center gap-space-sm">
                    <span className="font-semibold text-on-surface text-label-md">{microNiche}</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2 px-space-sm rounded-lg bg-surface-container-low">
                  <dt className="text-on-surface-variant font-medium text-body-sm">Jurisdiction</dt>
                  <dd className="flex items-center gap-space-sm">
                    <span className="font-semibold text-on-surface text-label-md">
                      {city}, {state} (Ward K-West)
                    </span>
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2 px-space-sm rounded-lg bg-surface-container-low">
                  <dt className="text-on-surface-variant font-medium text-body-sm">Entity Type</dt>
                  <dd className="flex items-center gap-space-sm">
                    <span className="font-semibold text-on-surface text-label-md">{entityType}</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2 px-space-sm rounded-lg bg-surface-container-low">
                  <dt className="text-on-surface-variant font-medium text-body-sm">Execution Stage</dt>
                  <dd className="flex items-center gap-space-sm">
                    <span className="font-semibold text-on-surface text-label-md">{businessStage}</span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Section 4: Live Generation Engine Simulation & CTA */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 relative overflow-hidden">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-label-sm font-label-sm uppercase font-bold text-on-surface-variant tracking-wider">
                    Engine Simulation
                  </span>
                </div>
                <span className="font-code-sm text-code-sm text-secondary font-semibold">
                  Latency ~140ms
                </span>
              </div>

              {/* Stepper Checklist with Animated Success States */}
              <div className="space-y-2.5 font-body-sm text-body-sm mb-space-lg">
                {SYNTHESIS_STEPS.map((step, idx) => (
                  <div
                    key={step}
                    className="flex items-center gap-space-sm p-2 rounded-lg bg-surface-container-low/70 transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-secondary font-bold" />
                    </div>
                    <span className="text-on-surface font-medium text-label-sm truncate">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dominant CTA */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isSynthesizing}
                className="w-full py-3.5 px-space-lg rounded-xl bg-primary-container hover:bg-primary text-white font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
              >
                {isSynthesizing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Synthesizing Compliance Graph...</span>
                  </>
                ) : (
                  <>
                    <span>Generate My Blueprint</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1.5s Simulated Synthesis Modal */}
      {isSynthesizing && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl max-w-md w-full shadow-xl border border-surface-container-high flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container mb-space-md">
              <Sparkles className="w-7 h-7 text-primary animate-pulse" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1">
              Building Your Business Blueprint
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
              Synthesizing municipal, state, and statutory regulations for {microNiche}...
            </p>

            {/* Dynamic Step Progress */}
            <div className="w-full bg-surface-container-low rounded-xl p-space-md text-left mb-space-md">
              <div className="flex items-center gap-2 text-primary font-semibold text-label-sm mb-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Step {currentStepIndex + 1} of 5</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface font-medium">
                {SYNTHESIS_STEPS[currentStepIndex]}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${((currentStepIndex + 1) / SYNTHESIS_STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

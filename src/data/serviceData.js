import img from "../assets/services/s1.png";

const serviceData = {
  //Hematology
  Hematology: {
    cbc: {
      title: "Complete Blood Count (CBC)",
      image: img,
      description:
        "CBC evaluates red blood cells, white blood cells, and platelets to detect anemia, infections, and overall health status in animals.",
      points:
        "Detect Anemia-Identify Infections-Monitor Immunity-Check Platelet Count",
      sampletype: "Blood",
      Resulttime: "30 min",
      Applicablefor: "Dogs, Cats, Livestock",
    },
  },

  //Biochemistry
  Biochemistry: {
    kft: {
      title: "Kidney Function Test (KFT)",
      image: img,
      description:
        "KFT assesses kidney health by measuring creatinine and urea levels, helping detect renal disorders in animals.",
      points: "Detect Kidney Disease-Monitor Renal Function-Assess Hydration",
      sampletype: "Blood",
      Resulttime: "30 min",
      Applicablefor: "Dogs, Cats, Livestock",
    },
    lft: {
      title: "Liver Function Test (LFT)",
      image: img,
      description:
        "LFT evaluates liver enzymes and proteins to diagnose liver diseases and monitor liver health.",
      points: "Detect Liver Damage-Monitor Enzymes-Assess Metabolism",
      sampletype: "Blood",
      Resulttime: "1 hr",
      Applicablefor: "Dogs, Cats, Livestock",
    },
    ast: {
      title: "AST/ ALT/ ALP/ TP/ Albumin/ Bilirubin",
      image: img,
      description:
        "These biomarkers help assess liver function, protein levels, and bile metabolism in animals.",
      points: "Evaluate Liver Enzymes-Check Protein Levels-Detect Jaundice",
      sampletype: "Blood",
      Resulttime: "20 min",
      Applicablefor: "Dogs, Cats, Livestock",
    },
    urea: {
      title: "Serum Creatinine/ Urea/ Uric Acid",
      image: img,
      description:
        "This test evaluates waste products in blood to monitor kidney efficiency and metabolic function.",
      points: "Assess Kidney Health-Detect Toxin Build-up-Monitor Metabolism",
      sampletype: "Blood",
      Resulttime: "20 min",
      Applicablefor: "Dogs, Cats, Livestock",
    },
    t4: {
      title: "Canine Specific Free T4",
      image: img,
      description:
        "Free T4 test measures the unbound thyroxine hormone in the blood, providing a more accurate assessment of thyroid function in animals.",
      points:
        "Evaluate Thyroid Function-Detect Hypothyroidism-Confirm Borderline Cases",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs",
    },
    totalt4: {
      title: "Canine Specific Total T4",
      image: img,
      description:
        "Total T4 test measures both bound and unbound thyroxine levels to assess overall thyroid function in animals.",
      points:
        "Screen Thyroid Disorders-Monitor Treatment-Detect Hypothyroidism",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs",
    },
    t3: {
      title: "Cannine Specific T3",
      image: img,
      description:
        "T3 test measures thyroid hormone levels to diagnose hyperthyroidism or hypothyroidism in dogs.",
      points: "Assess Thyroid Function-Detect Hormonal Imbalance",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs",
    },
    tsh: {
      title: "Cannine Specific TSH",
      image: img,
      description:
        "TSH test helps evaluate thyroid gland activity and diagnose thyroid disorders in dogs.",
      points: "Evaluate Thyroid-Stimulating Hormone-Detect Hypothyroidism",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs",
    },
    thyroidProfile: {
      title: "Complete Thyroid Profile (Free T4, Total T4, T3, TSH)",
      image: img,
      description:
        "Comprehensive thyroid profile evaluates multiple thyroid hormones to accurately diagnose and monitor thyroid disorders in animals.",
      points:
        "Assess Complete Thyroid Function-Detect Hypothyroidism & Hyperthyroidism-Monitor Ongoing Treatment",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs",
    },
    ldh: {
      title: "LDH - Lactate Dehydrogenase",
      image: img,
      description:
        "LDH levels indicate tissue damage and help diagnose muscle, liver, or organ injury.",
      points: "Detect Tissue Damage-Monitor Disease Progression",
      sampletype: "Blood",
      Resulttime: "24 hrs",
      Applicablefor: "Dogs, Cats",
    },
    rbs: {
      title: "Random Blood Sugar",
      image: img,
      description:
        "RBS test measures glucose levels to diagnose diabetes and monitor blood sugar fluctuations.",
      points: "Detect Diabetes-Monitor Glucose Levels",
      sampletype: "Blood",
      Resulttime: "20 min",
      Applicablefor: "Dogs, Cats",
    },
    sl: {
      title: "Serum Lipase",
      image: img,
      description:
        "Serum Lipase test helps detect pancreatic inflammation and digestive disorders.",
      points: "Detect Pancreatitis-Assess Digestive Health",
      sampletype: "Blood",
      Resulttime: "20 min",
      Applicablefor: "Dogs, Cats",
    },
    sa: {
      title: "Serum Analyse",
      image: img,
      description:
        "Serum analysis evaluates multiple biochemical parameters to assess overall metabolic health.",
      points: "Check Organ Function-Assess Metabolism",
      sampletype: "Blood",
      Resulttime: "20 min",
      Applicablefor: "Dogs, Cats, Livestock",
    },
    b12: {
      title: "Vitamin B12",
      image: img,
      description:
        "Vitamin B12 test helps detect deficiencies affecting digestion, nerve function, and metabolism.",
      points: "Detect Deficiency-Support Nerve Health",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs, Cats",
    },
    d: {
      title: "Vitamin D",
      image: img,
      description:
        "Vitamin D test evaluates calcium regulation and bone health in animals.",
      points: "Assess Bone Health-Detect Deficiency",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs, Cats",
    },
    troponinI: {
  title: "Cardiac Troponin I (cTnI)",
  image: img,
  description:
    "Cardiac Troponin I test measures a heart-specific protein released during cardiac muscle injury, helping detect heart damage in animals.",
  points:
    "Detect Cardiac Injury-Assess Heart Health-Monitor Cardiac Conditions",
  sampletype: "Blood",
  Resulttime: "24 hrs",
  Applicablefor: "Dogs",
},
troponinT: {
  title: "Cardiac Troponin T (cTnT)",
  image: img,
  description:
    "Cardiac Troponin T test evaluates heart muscle damage by measuring troponin levels released into the bloodstream.",
  points:
    "Identify Heart Muscle Damage-Support Cardiac Diagnosis-Monitor Disease Progression",
  sampletype: "Blood",
  Resulttime: "24 hrs",
  Applicablefor: "Dogs",
},
progesterone: {
  title: "Progesterone Test",
  image: img,
  description:
    "Progesterone test measures hormone levels to monitor reproductive cycles, ovulation timing, and pregnancy status in animals.",
  points:
    "Track Ovulation-Assist Breeding Management-Confirm Pregnancy",
  sampletype: "Blood",
  Resulttime: "Same Day",
  Applicablefor: "Dogs",
},
crp: {
  title: "C-Reactive Protein (CRP)",
  image: img,
  description:
    "CRP test detects inflammation levels in the body and helps identify infections or inflammatory conditions in animals.",
  points:
    "Detect Inflammation-Monitor Infections-Assess Treatment Response",
  sampletype: "Blood",
  Resulttime: "24 hrs",
  Applicablefor: "Dogs",
},
calcium: {
  title: "Serum Calcium Test",
  image: img,
  description:
    "Calcium test measures calcium levels in the blood to evaluate bone health, nerve function, and metabolic balance.",
  points:
    "Assess Bone Health-Detect Metabolic Disorders-Monitor Calcium Imbalance",
  sampletype: "Blood",
  Resulttime: "24 hrs",
  Applicablefor: "Dogs",
},
sodium: {
  title: "Serum Sodium Test",
  image: img,
  description:
    "Sodium test measures electrolyte balance in the body, essential for fluid regulation and nerve function in animals.",
  points:
    "Maintain Fluid Balance-Assess Electrolyte Levels-Detect Dehydration",
  sampletype: "Blood",
  Resulttime: "24 hrs",
  Applicablefor: "Dogs",
},
potassium: {
  title: "Serum Potassium Test",
  image: img,
  description:
    "Potassium test evaluates electrolyte levels important for muscle function, heart rhythm, and nerve signals.",
  points:
    "Monitor Heart Function-Detect Electrolyte Imbalance-Support Muscle Health",
  sampletype: "Blood",
  Resulttime: "24 hrs",
  Applicablefor: "Dogs",
},
ldh: {
  title: "Lactate Dehydrogenase (LDH)",
  image: img,
  description:
    "LDH test measures enzyme levels released during tissue damage, helping assess organ health and detect underlying conditions.",
  points:
    "Detect Tissue Damage-Assess Organ Health-Monitor Disease Progression",
  sampletype: "Blood",
  Resulttime: "24 hrs",
  Applicablefor: "Dogs",
},
cpl: {
  title: "Canine Pancreatic Lipase (cPL)",
  image: img,
  description:
    "cPL test specifically evaluates pancreatic lipase levels to accurately diagnose pancreatitis in dogs.",
  points:
    "Diagnose Pancreatitis-Assess Pancreatic Function-Monitor Recovery",
  sampletype: "Blood",
  Resulttime: "24-48 hrs",
  Applicablefor: "Dogs",
}
  },

  //Molecular Biology
  MolecularBiology: {
    cdv: {
      title: "Canine Distemper Virus - RT-PCR",
      image: img,
      description:
        "RT-PCR test detects Canine Distemper Virus early by identifying viral genetic material.",
      points: "Early Detection-Accurate Diagnosis",
      sampletype: "Blood/Swab",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs",
    },

    ctfc: {
      // 2: {
      //   title: "2 Organisms",
      //   image: img,
      //   description:
      //     "Panel detects two tick-borne pathogens causing fever and blood infections in dogs.",
      //   points: "Detect Tick Fever-Early Diagnosis",
      //   sampletype: "Blood",
      //   Resulttime: "24-48 hrs",
      //   Applicablefor: "Dogs",
      // },
      // 4: {
      //   title: "4 Organisms",
      //   image: img,
      //   description:
      //     "Panel identifies four major tick-borne infections affecting canine health.",
      //   points: "Multi-pathogen Detection",
      //   sampletype: "Blood",
      //   Resulttime: "24-48 hrs",
      //   Applicablefor: "Dogs",
      // },
      // 7: {
      //   title: "7 Organisms",
      //   image: img,
      //   description:
      //     "Advanced panel detecting seven tick-borne diseases for comprehensive screening.",
      //   points: "Comprehensive Detection",
      //   sampletype: "Blood",
      //   Resulttime: "24-48 hrs",
      //   Applicablefor: "Dogs",
      // },
      ctfpbg: {
        title: "Cannie Tick Fever Panel Babesia Gibsoni",
        image: img,
        description:
          "Detects Babesia gibsoni infection causing anemia and fever in dogs.",
        points: "Detect Babesia Infection",
        sampletype: "Blood",
        Resulttime: "24-48 hrs",
        Applicablefor: "Dogs",
      },
      ctfpbc: {
        title: "Cannie Tick Fever Panel Babesia Canis",
        image: img,
        description:
          "Identifies Babesia canis infection affecting red blood cells.",
        points: "Detect Blood Parasite",
        sampletype: "Blood",
        Resulttime: "24-48 hrs",
        Applicablefor: "Dogs",
      },
      ctfpbr: {
        title: "Cannie Tick Fever Panel Babesia Rossi",
        image: img,
        description:
          "Detects Babesia rossi infection causing severe illness in dogs.",
        points: "Early Detection",
        sampletype: "Blood",
        Resulttime: "24-48 hrs",
        Applicablefor: "Dogs",
      },
      ctfpbv: {
        title: "Cannie Tick Fever Panel Babesia Vogeli",
        image: img,
        description: "Detects Babesia vogeli infection transmitted by ticks.",
        points: "Tick Disease Detection",
        sampletype: "Blood",
        Resulttime: "24-48 hrs",
        Applicablefor: "Dogs",
      },
      ctfphc: {
        title: "Cannie Tick Fever Panel Hepatozoon Canis",
        image: img,
        description:
          "Detects Hepatozoon canis infection affecting muscles and blood.",
        points: "Detect Protozoal Infection",
        sampletype: "Blood",
        Resulttime: "24-48 hrs",
        Applicablefor: "Dogs",
      },
      ctfpec: {
        title: "Cannie Tick Fever Panel Ehrlichia Canis",
        image: img,
        description:
          "Detects Ehrlichia infection causing fever and platelet loss.",
        points: "Detect Tick-borne Disease",
        sampletype: "Blood",
        Resulttime: "24-48 hrs",
        Applicablefor: "Dogs",
      },
      ctfpap: {
        title: "Cannie Tick Fever Panel Anaplasma Platys",
        image: img,
        description: "Detects Anaplasma platys infection affecting platelets.",
        points: "Detect Platelet Disorder",
        sampletype: "Blood",
        Resulttime: "24-48 hrs",
        Applicablefor: "Dogs",
      },
    },

    ap: {
      title: "Anaplasma Phago Cytophilum",
      image: img,
      description:
        "Detects Anaplasma infection causing fever, joint pain, and blood disorders.",
      points: "Detect Tick Infection",
      sampletype: "Blood",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs, Cats",
    },
    feline: {
  fiv: {
    title: "Feline Immunodeficiency Virus (FIV)",
    image: img,
    description:
      "Detects Feline Immunodeficiency Virus infection that weakens the immune system and increases susceptibility to infections in cats.",
    points: "Detect Viral Infection-Assess Immune Status",
    sampletype: "Blood",
    Resulttime: "24-48 hrs",
    Applicablefor: "Cats",
  },

  felv: {
    title: "Feline Leukemia Virus (FeLV)",
    image: img,
    description:
      "Identifies Feline Leukemia Virus infection that can cause anemia, immune suppression, and cancer in cats.",
    points: "Detect Viral Infection-Monitor Health Status",
    sampletype: "Blood",
    Resulttime: "24-48 hrs",
    Applicablefor: "Cats",
  },

  babesiafelis: {
    title: "Feline Babesia felis",
    image: img,
    description:
      "Detects Babesia felis infection, a tick-borne parasite affecting red blood cells and causing anemia in cats.",
    points: "Detect Blood Parasite-Early Diagnosis",
    sampletype: "Blood",
    Resulttime: "24-48 hrs",
    Applicablefor: "Cats",
  },

  anaplasmaphagocytophilum: {
    title: "Feline Anaplasma phagocytophilum",
    image: img,
    description:
      "Detects Anaplasma phagocytophilum infection, a tick-borne disease affecting white blood cells and causing fever in cats.",
    points: "Detect Tick-borne Infection-Monitor Fever Conditions",
    sampletype: "Blood",
    Resulttime: "24-48 hrs",
    Applicablefor: "Cats",
  },

  calicivirus: {
    title: "Feline Calicivirus (FCV)",
    image: img,
    description:
      "Detects Feline Calicivirus infection causing respiratory illness, oral ulcers, and fever in cats.",
    points: "Detect Respiratory Infection-Monitor Viral Disease",
    sampletype: "Swab / Blood",
    Resulttime: "24-48 hrs",
    Applicablefor: "Cats",
  },

  fip: {
    title: "Feline Infectious Peritonitis (FIP)",
    image: img,
    description:
      "Detects Feline Infectious Peritonitis, a serious viral disease caused by mutated coronavirus affecting multiple organs in cats.",
    points: "Early Detection-Monitor Systemic Infection",
    sampletype: "Blood / Fluid",
    Resulttime: "24-48 hrs",
    Applicablefor: "Cats",
  },
},

    cpv: {
      title: "Cannine Parvovirus (CPV)",
      image: img,
      description:
        "Detects Parvovirus infection causing severe diarrhea and vomiting in dogs.",
      points: "Early Virus Detection",
      sampletype: "Feces/Blood",
      Resulttime: "Same Day",
      Applicablefor: "Dogs",
    },

    leptospira: {
      title: "Leptospira",
      image: img,
      description:
        "Detects bacterial infection affecting liver and kidneys, transmitted through contaminated water.",
      points: "Detect Zoonotic Infection",
      sampletype: "Blood/Urine",
      Resulttime: "24-48 hrs",
      Applicablefor: "Dogs, Livestock",
    },
  },

  //Histopathology
  Histopathology: {
    histopathology: {
  title: "Histopathology Examination",
  image: img,
  description:
    "Histopathology involves microscopic examination of tissue samples to diagnose diseases, tumors, infections, and inflammatory conditions in animals.",
  points:
    "Detect Tumors & Cancer-Diagnose Infections-Assess Tissue Abnormalities",
  sampletype: "Tissue Biopsy",
  Resulttime: "3-5 Days",
  Applicablefor: "Dogs & Cats",
},
    biopsy: {
      title: "Biopsy",
      image: img,
      description:
        "Biopsy examines tissue samples to diagnose tumors, infections, or organ diseases.",
      points: "Detect Cancer-Identify Tissue Damage",
      sampletype: "Tissue",
      Resulttime: "6-7 days",
      Applicablefor: "Dogs, Cats",
    },
    fnac: {
      title: "FNAC",
      image: img,
      description:
        "Fine Needle Aspiration Cytology collects cells to diagnose lumps and tumors.",
      points: "Quick Tumor Diagnosis",
      sampletype: "Cell Sample",
      Resulttime: "1-2 days",
      Applicablefor: "Dogs, Cats",
    },
    
    abst: {
      title: "Culture & Antibiotic sensitivity Test (ABST) Aerobic",
      image: img,
      description:
        "Identifies bacteria and determines effective antibiotics for treatment.",
      points: "Guide Antibiotic Therapy",
      sampletype: "Swab/Fluid",
      Resulttime: "6-7 hrs",
      Applicablefor: "Dogs, Cats, Livestock",
    },
    abstAnaerobic: {
  title: "Culture & Antibiotic Sensitivity Test (Anaerobic)",
  image: img,
  description:
    "Anaerobic culture identifies bacteria that grow in the absence of oxygen and determines effective antibiotics to treat infections.",
  points:
    "Detect Anaerobic Bacteria-Guide Antibiotic Therapy-Improve Treatment Accuracy",
  sampletype: "Pus / Tissue / Fluid",
  Resulttime: "3-5 Days",
  Applicablefor: "Dogs & Cats",
},
    sse: {
      title: "Skin Scraping Examination",
      image: img,
      description: "Detects mites, fungal infections, and skin parasites.",
      points: "Diagnose Skin Diseases",
      sampletype: "Skin Scraping",
      Resulttime: "Same Day",
      Applicablefor: "Dogs, Cats",
    },
    fungalCulture: {
  title: "Fungal Culture Test",
  image: img,
  description:
    "Fungal culture detects fungal infections by growing organisms from samples such as skin, hair, or tissues under controlled conditions.",
  points:
    "Identify Fungal Infections-Diagnose Skin & Systemic Mycoses-Guide Antifungal Treatment",
  sampletype: "Skin Scraping / Hair / Tissue",
  Resulttime: "5-10 Days",
  Applicablefor: "Dogs & Cats",
},
bacterialCulture: {
  title: "Bacterial Culture Test",
  image: img,
  description:
    "Bacterial culture isolates and identifies bacteria causing infections, helping determine the appropriate treatment.",
  points:
    "Identify Infectious Bacteria-Confirm Diagnosis-Support Targeted Treatment",
  sampletype: "Blood / Urine / Pus / Swab",
  Resulttime: "24-72 hrs",
  Applicablefor: "Dogs & Cats",
}
  },
  // PCR (UNCHANGED)
  pcr: {
    title: "Polymerase Chain Reaction (PCR)",
    image: img,
    description:
      "A Polymerase Chain Reaction (PCR) is a core veterinary diagnostic test that measures red and white blood cells and platelets, providing vital insights into an animal’s health, disease detection, treatment monitoring, and clinical decision-making.",
    points:
      "Detect Anemia and Blood Disorders-Identify Infections and Inflammation-Assess Overall Health Status-Monitor Treatment Response",
    sampletype: "Blood",
    Resulttime: "24hrs to 48hrs",
    Applicablefor: "Dogs, Cats, Livestock",
  },

  rtpcr: {
    title: "Reverse Transcription Polymerase Chain Reaction (RT-PCR) Test",
    image: img,
    description:
      "RT-PCR detects RNA viruses by converting RNA into DNA for accurate diagnosis.",
    points: "Detect Viral Infections",
    sampletype: "Blood/Swab",
    Resulttime: "24-48 hrs",
    Applicablefor: "Dogs, Cats",
  },
  cbp: {
    title: "Complete Blood Picture (CBP)",
    image: img,
    description:
      "A Complete Blood Picture (CBP) is a detailed diagnostic test that evaluates red blood cells, white blood cells, hemoglobin, and platelets to assess overall health and detect infections, anemia, and blood-related disorders in animals.",
    points:
      "Detect Anemia and Blood Disorders-Identify Infections and Inflammation-Assess Immune System Health-Monitor Disease Progression",
    sampletype: "Blood",
    Resulttime: "24 hrs",
    Applicablefor: "Dogs, Cats, Livestock",
  },

  act: {
    title: "Aerobic Culture Test(ACT)",
    image: img,
    description:
      "Identifies aerobic bacteria causing infections and helps guide treatment.",
    points: "Detect Bacterial Infection",
    sampletype: "Swab/Fluid",
    Resulttime: "48-72 hrs",
    Applicablefor: "Dogs, Cats, Livestock",
  },

  plt: {
    title: "Pancreatic Lipase Test(PLT)",
    image: img,
    description: "Detects pancreatic inflammation and pancreatitis in animals.",
    points: "Diagnose Pancreatitis",
    sampletype: "Blood",
    Resulttime: "24 hrs",
    Applicablefor: "Dogs, Cats",
  },

  pet: {
    title: "Pancreatic Elastase(PE)",
    image: img,
    description:
      "Evaluates pancreatic enzyme levels to assess digestive function.",
    points: "Assess Pancreatic Health",
    sampletype: "Feces",
    Resulttime: "24-48 hrs",
    Applicablefor: "Dogs",
  },
};

export default serviceData;

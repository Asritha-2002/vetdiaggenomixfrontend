import serviceData from "./serviceData.js";

// Collects every leaf service (one with a "title") inside an object, however nested
function collectLeafServices(obj) {
  const leaves = [];
  for (let key in obj) {
    const value = obj[key];
    if (value && typeof value === "object") {
      if (value.title) {
        leaves.push({ key, ...value });
      } else {
        leaves.push(...collectLeafServices(value));
      }
    }
  }
  return leaves;
}

export function getRelatedServices(categoryName, currentKey, count = 3) {
  let pool = [];

  if (categoryName && serviceData[categoryName]) {
    // Same category (e.g. all Biochemistry tests)
    pool = collectLeafServices(serviceData[categoryName]);
  } else {
    // Top-level standalone services (pcr, rtpcr, cbp, act, plt, pet)
    for (let key in serviceData) {
      const value = serviceData[key];
      if (value && value.title) {
        pool.push({ key, ...value });
      }
    }
  }

  const filtered = pool.filter((s) => s.key !== currentKey);
  const shuffled = filtered.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}
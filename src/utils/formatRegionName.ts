const formatRegionName = (region: { name: string }) => {
  return `${region.name.charAt(0).toUpperCase()}${region.name.slice(1)} ${
    region.name === "toshkent"
      ? "shahri"
      : region.name === "qoraqalpog'iston"
      ? "Respublikasi"
      : "viloyati"
  }`;
};

export default formatRegionName;

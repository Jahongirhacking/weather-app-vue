const formatRegionName = (region: { name: string }) => {
  return `${region.name.charAt(0).toUpperCase()}${region.name.slice(1)} ${
    region.name === "toshkent"
      ? "shahri"
      : region.name === "qoraqalpogiston"
      ? "Respublikasi"
      : "viloyati"
  }`;
};

export default formatRegionName;

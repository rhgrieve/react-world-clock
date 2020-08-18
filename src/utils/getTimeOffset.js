const url = "https://worldtimeapi.org/api/timezone/";

const getTimeOffset = async (zone) => {
  try {
    await fetch(url + zone).then((res) => res.utc_offset);
  } catch (e) {
    throw new Error(e);
  }
};

export default getTimeOffset;

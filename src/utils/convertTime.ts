export function convertTime(timeStr: string) {
  let resTime = "";
  try {
    const time = timeStr.split("T")[1]?.split("+")[0]?.split(":");

    if (Array.isArray(time)) {
      resTime = [time[0], time[1]].join(":");
    }
  } catch (e) {
    console.log(e);
    resTime = "";
  }

  return resTime;
}

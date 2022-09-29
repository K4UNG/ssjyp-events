interface Artist {
  name: string;
  birthdate: string;
}

interface Album {
  title: string;
  releastDate: string;
}

export function isBirthday(artists: Artist[]) {
  const { curr, currYear, currMonth } = getKoreanDate();
  let birthdays: string[] = [];

  artists.forEach((artist) => {
    const check = checkRange(artist.birthdate, currYear, currMonth, curr);
    if (check) birthdays.push(artist.name);
  });

  return birthdays;
}

export function isBonus(albums: Album[]) {
  const { curr, currYear, currMonth } = getKoreanDate();
  let bonuses: string[] = [];
  albums.forEach((album) => {
    const check = checkRange(album.releastDate, currYear, currMonth, curr);
    if (check) {
      bonuses.push(album.title);
    }
  });
  return bonuses;
}

function checkRange(
  checkdate: string,
  currYear: number,
  currMonth: number,
  curr: Date
) {
  const [_, month, day] = checkdate.split("-");

  let year = currYear;

  if (+month - 1 === 0 && currMonth === 11) {
    year = currYear + 1;
  } else if (+month - 1 === 11 && currMonth === 0) {
    year = currYear - 1;
  }
  const date = new Date(year, +month - 1, +day);
  const start = new Date(year, +month - 1, +day);
  start.setDate(date.getDate() - 3);
  const end = new Date(year, +month - 1, +day);
  end.setDate(date.getDate() + 3);

  if (curr >= start && curr <= end) {
    return true;
  }
  return false;
}

function getKoreanDate() {
  const curr = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });
  //   const curr = new Date("2022/08/23"); // test
  const date = new Date(curr);
  return {
    curr: date,
    currYear: date.getFullYear(),
    currMonth: date.getMonth(),
  };
}

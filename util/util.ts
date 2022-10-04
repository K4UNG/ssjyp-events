interface Artist {
  name: string;
  birthdate: string;
}

interface Album {
  title: string;
  releastDate: string;
}

export function isBirthday(artists: Artist[], time: string) {
  const { curr, currYear, currMonth } = getKoreanDate(time);
  let birthdays: string[] = [];

  artists.forEach((artist) => {
    const check = checkRange(artist.birthdate, currYear, currMonth, curr);
    if (check) birthdays.push(artist.name);
  });

  return birthdays;
}

export function isBonus(albums: Album[], time: string) {
  const { curr, currYear, currMonth } = getKoreanDate(time);
  let bonuses: string[] = [];
  albums.forEach((album) => {
    const check = checkRange(album.releastDate, currYear, currMonth, curr);
    if (check) {
      bonuses.push(album.title);
    }
  });
  return bonuses;
}

export function getAge(dateString: string) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
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
  end.setDate(date.getDate() + 4);

  if (curr >= start && curr <= end) {
    return true;
  }
  return false;
}

export function getKoreanDate(time: string) {
  const curr = new Date(time).toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });
  //   const curr = new Date("2022/09/22"); // test
  const date = new Date(curr);
  return {
    curr: date,
    currYear: date.getFullYear(),
    currMonth: date.getMonth(),
  };
}

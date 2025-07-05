const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/coffees');
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

await fetchData();

const first = await fetch('http://127.0.0.1:3000/coffees/1');

console.log('Exit the program' + JSON.stringify(await first.json()));

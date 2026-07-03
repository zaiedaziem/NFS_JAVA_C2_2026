// console.log("1. Start")

// setTimeout(() => {
//     console.log("2. Inside setTimeout")
// }, 0)

// console.log("3. End")


async function fetchData() {
  const response = await fetch("courses.json");
  
  console.log(response);
}

fetchData();
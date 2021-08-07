const fs = require("fs"); 
const path = require("path");

const name = [
  'Arya Stark', 'Jon Snow', 'Sansa Stark', 'Robb Stark', 'Tyrion Lannister',
]
const scoreData = []
// 60 - 150
const randomScore = () => (Math.floor(Math.random() * 91 + 60))

for(let i = 1; i <= 60; i++) {
  let temp = {
    id: i,
    name: name[Math.floor(Math.random() * name.length)],
    // 50-365
    duration: Math.floor(Math.random() * 216 + 50 ),
    chinese: randomScore(),
    math: randomScore(),
    english: randomScore(),
    memo: false
  }
  if(i % 10 === 0) temp.memo = true
  scoreData.push(temp)
}



// const jsonData = { size: scoreData.length,  score: scoreData }
const jsonData = { score: scoreData, name }

fs.writeFileSync(
  path.join(__dirname, 'table.json'), 
  JSON.stringify(jsonData)
)
console.log(__dirname)

// console.log(jsonData)
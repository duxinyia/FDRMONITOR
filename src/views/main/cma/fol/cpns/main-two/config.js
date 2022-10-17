// 三个状态的
export let stateBall = [
  { id: 1, text: "DPC" },
  { id: 2, text: "LCB" },
  { id: 3, text: "e-fail" }
]
let bgColor = "rgba(52, 172, 224,0.6)"
let color = "#4ed4a5"
export let textArr = ["FC", "UF", "SC", "SSC", "PP", "GA", "OVEN"]

export let divArr2 = [
  [
    {
      id: 1,
      text: textArr[0],
      style: {
        width: "45px",
        height: "23px",
        "line-height": "23px",
        "margin-left": "6px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 2,
      style: {
        width: "20px",
        height: "5px",
        "margin-left": "15px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 3,
      text: textArr[1],
      style: {
        width: "40px",
        height: "23px",
        "line-height": "23px",
        "margin-left": "6px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 4,
      style: {
        width: "20px",
        height: "5px",
        "margin-left": "15px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 5,
      text: textArr[2],
      style: {
        width: "50px",
        height: "23px",
        "line-height": "23px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 6,
      text: textArr[3],
      style: {
        width: "50px",
        height: "48px",
        "line-height": "48px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 7,
      text: textArr[4],
      style: {
        width: "40px",
        height: "26px",
        "line-height": "26px",
        "margin-left": "6px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 8,
      text: textArr[5],
      style: {
        width: "40px",
        height: "26px",
        "line-height": "26px",
        "margin-left": "6px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 9,
      style: {
        width: "20px",
        height: "5px",
        "margin-left": "15px",
        border: `1px solid ${color}`
      }
    },
    {
      id: 10,
      text: textArr[6],
      style: {
        width: "50px",
        height: "20px",
        "line-height": "21px",
        border: `1px solid ${color}`
      }
    }
  ],
  []
]

// let bgColor =
//   "radial-gradient(rgba(103, 249, 216, 0) 0,rgba(103, 249, 216, 0.5) 50%,rgba(103, 249, 216, 0.8) 100%)"
// let bgColor = "rgba(52, 172, 224,0.6)"
// 每个div的配置
export let divsArr = [
  [
    {
      id: 1,
      text: "FC",
      style: {
        width: "40px",
        height: "23px",
        "line-height": "23px",
        "margin-left": "6px",
        background: bgColor
      }
    },
    {
      id: 2,
      text: "",
      style: {
        width: "15px",
        height: "5px",
        "margin-left": "15px",
        background: "rgba(103, 249, 216)"
      }
    },
    {
      id: 3,
      text: "UF",
      style: {
        width: "35px",
        height: "23px",
        "line-height": "23px",
        "margin-left": "6px",
        background: bgColor
      }
    },
    {
      id: 4,
      text: "",
      style: {
        width: "15px",
        height: "5px",
        "margin-left": "15px",
        background: "rgba(103, 249, 216)"
      }
    },
    {
      id: 5,
      text: "SC",
      style: {
        width: "45px",
        height: "23px",
        "line-height": "23px",
        background: bgColor
        // background: "rgba(255, 228, 52,0.8)"
      }
    },
    {
      id: 6,
      text: "SSC",
      style: {
        width: "45px",
        height: "48px",
        "line-height": "48px",
        "border-bottom": "2px solid #fff",
        "border-top": "2px solid #fff",
        background: bgColor
      }
    },
    {
      id: 7,
      text: "PP",
      style: {
        width: "35px",
        height: "26px",
        "line-height": "26px",
        "border-bottom": "2px solid #fff",
        background: bgColor
      }
    },
    {
      id: 8,
      text: "GA",
      style: {
        width: "45px",
        height: "26px",
        "line-height": "26px",
        background: bgColor
        // background: "rgba(255, 228, 52,0.8)"
      }
    },
    {
      id: 9,
      text: "",
      style: {
        width: "15px",
        height: "5px",
        "margin-left": "15px",
        background: "rgba(103, 249, 216)"
      }
    },
    {
      id: 10,
      text: "OPEN",
      style: {
        width: "45px",
        height: "20px",
        "line-height": "21px",
        // background: "rgba(41, 207, 230, 0.8)"
        background: bgColor
      }
    }
  ],
  [
    {
      id: 1,
      text: "OVEN",
      style: {
        width: "40px",
        height: "16px",
        "line-height": "16px",
        background: "rgba(41, 207, 230, 0.9)"
      }
    },
    {
      id: 2,
      text: "",
      style: {
        width: "12px",
        height: "7px",
        "margin-left": "15px",
        background: "green"
      }
    },
    {
      id: 3,
      text: "GA",
      style: {
        width: "40px",
        height: "26px",
        "line-height": "26px",
        background: "rgba(171, 117, 248, 0.9)"
      }
    },
    {
      id: 4,
      text: "PP",
      style: {
        width: "30px",
        height: "26px",
        "line-height": "26px",
        "margin-left": "10px",
        background: "rgba(41, 207, 230, 0.9)"
      }
    },
    {
      id: 5,
      text: "SSC",
      style: {
        width: "40px",
        height: "46px",
        "line-height": "46px",
        background: "rgba(171, 117, 248, 0.9)"
      }
    },
    {
      id: 6,
      text: "SC",
      style: {
        width: "40px",
        height: "21px",
        "line-height": "21px",
        background: "rgba(41, 207, 230, 0.9)"
      }
    },
    {
      id: 7,
      text: "",
      style: {
        width: "12px",
        height: "7px",
        "margin-left": "15px",
        background: "green"
      }
    },
    {
      id: 8,
      text: "UF",
      style: {
        width: "30px",
        height: "23px",
        "line-height": "23px",
        "margin-left": "6px",
        background: "rgba(171, 117, 248, 0.9)"
      }
    },
    {
      id: 9,
      text: "",
      style: { width: "12px", height: "7px", "margin-left": "15px", background: "green" }
    },
    {
      id: 10,
      text: "FC",
      style: {
        width: "35px",
        height: "23px",
        "line-height": "23px",
        // "margin-left": "6px",
        background: "rgba(41, 207, 230, 0.9)"
      }
    }
  ]
]

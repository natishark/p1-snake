const IMAGE_SOURCES = {
  bodyVertical: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 8,
        y: 8,
        width: 88,
        height: 20,
      },
      {
        x: 16,
        y: 30,
        width: 88,
        height: 20,
      },
      {
        x: 12,
        y: 18,
        width: 88,
        height: 20,
      },
      {
        x: 19,
        y: 40,
        width: 88,
        height: 20,
      },
      {
        x: 22,
        y: 50,
        width: 88,
        height: 20,
      },
      {
        x: 20,
        y: 82,
        width: 88,
        height: 20,
      },
      {
        x: 24,
        y: 65,
        width: 88,
        height: 20,
      },
      {
        x: 16,
        y: 92,
        width: 88,
        height: 20,
      },
    ]
  },
  bodyHorizontal: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 112,
        y: 8,
        width: -20,
        height: 88,
      },
      {
        x: 90,
        y: 16,
        width: -20,
        height: 88,
      },
      {
        x: 102,
        y: 12,
        width: -20,
        height: 88,
      },
      {
        x: 80,
        y: 19,
        width: -20,
        height: 88,
      },
      {
        x: 70,
        y: 22,
        width: -20,
        height: 88,
      },
      {
        x: 38,
        y: 20,
        width: -20,
        height: 88,
      },
      {
        x: 55,
        y: 24,
        width: -20,
        height: 88,
      },
      {
        x: 28,
        y: 16,
        width: -20,
        height: 88,
      },
    ]
  },
  bodyJoint: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 16,
        y: 8,
        width: 44,
        height: 52,
      },
      {
        x: 60,
        y: 16,
        width: 44,
        height: 44,
      },
      {
        x: 8,
        y: 60,
        width: 52,
        height: 36,
      },
      {
        x: 60,
        y: 60,
        width: 36,
        height: 44,
      },
      {
        x: 23,
        y: 90,
        width: 45,
        height: 11,
      },
      {
        x: 45,
        y: 11,
        width: 45,
        height: 11,
      },
      {
        x: 91,
        y: 54,
        width: 9,
        height: 40,
      },
      {
        x: 12,
        y: 23,
        width: 9,
        height: 40,
      },
     
    ]
  },
  headUp: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 36,
        y: 8,
        width: 53,
        height: 20,
      },
      {
        x: 17,
        y: 25,
        width: 89,
        height: 19,
      },
      {
        x: 24,
        y: 15,
        width: 78,
        height: 20,
      },
      {
        x: 86,
        y: 40,
        width: 24,
        height: 20,
      },
      {
        x: 44,
        y: 40,
        width: 36,
        height: 20,
      },
      {
        x: 10,
        y: 40,
        width: 28,
        height: 20,
      },
      {
        x: 5,
        y: 52,
        width: 109,
        height: 18,
      },
      {
        x: 9,
        y: 82,
        width: 99,
        height: 20,
      },
      {
        x: 7,
        y: 65,
        width: 105,
        height: 20,
      },
      {
        x: 12,
        y: 92,
        width: 87,
        height: 20,
      },
    ]
  },
  headDown: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 8,
        y: 8,
        width: 88,
        height: 20,
      },
      {
        x: 13,
        y: 30,
        width: 94,
        height: 20,
      },
      {
        x: 11,
        y: 18,
        width: 91,
        height: 20,
      },
      {
        x: 12,
        y: 42,
        width: 100,
        height: 20,
      },
      {
        x: 10,
        y: 58,
        width: 104,
        height: 19,
      },
      {
        x: 20,
        y: 85,
        width: 83,
        height: 20,
      },
      {
        x: 83,
        y: 70,
        width: 27,
        height: 20,
      },
      {
        x: 48,
        y: 70,
        width: 29,
        height: 20,
      },
      {
        x: 13,
        y: 70,
        width: 29,
        height: 20,
      },
      {
        x: 30,
        y: 92,
        width: 68,
        height: 20,
      },     
    ]
  },
  headLeft: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 112,
        y: 8,
        width: -20,
        height: 88,
      },
      {
        x: 90,
        y: 13,
        width: -20,
        height: 94,
      },
      {
        x: 102,
        y: 11,
        width: -20,
        height: 91,
      },
      {
        x: 78,
        y: 12,
        width: -20,
        height: 100,
      },
      {
        x: 62,
        y: 10,
        width: -19,
        height: 104,
      },
      {
        x: 35,
        y: 20,
        width: -20,
        height: 83,
      },
      {
        x: 50,
        y: 83,
        width: -20,
        height: 27,
      },
      {
        x: 50,
        y: 48,
        width: -20,
        height: 29,
      },
      {
        x: 50,
        y: 13,
        width: -20,
        height: 29,
      },
      {
        x: 28,
        y: 30,
        width: -20,
        height: 68,
      },
    ]
  },
  headRight: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 112,
        y: 36,
        width: -20,
        height: 53,
      },
      {
        x: 95,
        y: 17,
        width: -19,
        height: 89,
      },
      {
        x: 105,
        y: 24,
        width: -20,
        height: 78,
      },
      {
        x: 80,
        y: 86,
        width: -20,
        height: 24,
      },
      {
        x: 80,
        y: 44,
        width: -20,
        height: 36,
      },
      {
        x: 80,
        y: 10,
        width: -20,
        height: 28,
      },
      {
        x: 68,
        y: 5,
        width: -18,
        height: 109,
      },
      {
        x: 38,
        y: 9,
        width: -20,
        height: 99,
      },
      {
        x: 55,
        y: 7,
        width: -20,
        height: 105,
      },
      {
        x: 28,
        y: 12,
        width: -20,
        height: 87,
      },
    ]
  },
  tailUp: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 49,
        y: 8,
        width: 19,
        height: 20,
      },
      {
        x: 42,
        y: 30,
        width: 46,
        height: 20,
      },
      {
        x: 45,
        y: 18,
        width: 33,
        height: 20,
      },
      {
        x: 38,
        y: 40,
        width: 58,
        height: 20,
      },
      {
        x: 35,
        y: 50,
        width: 69,
        height: 20,
      },
      {
        x: 20,
        y: 82,
        width: 88,
        height: 20,
      },
      {
        x: 28,
        y: 65,
        width: 84,
        height: 20,
      },
      {
        x: 16,
        y: 92,
        width: 88,
        height: 20,
      },
    ]
  },
  tailDown: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 8,
        y: 8,
        width: 88,
        height: 20,
      },
      {
        x: 19,
        y: 30,
        width: 85,
        height: 20,
      },
      {
        x: 12,
        y: 18,
        width: 88,
        height: 20,
      },
      {
        x: 30,
        y: 40,
        width: 77,
        height: 20,
      },
      {
        x: 42,
        y: 50,
        width: 68,
        height: 20,
      },
      {
        x: 49,
        y: 82,
        width: 45,
        height: 20,
      },
      {
        x: 46,
        y: 65,
        width: 58,
        height: 20,
      },
      {
        x: 56,
        y: 92,
        width: 21,
        height: 20,
      },
    ]
  },
  tailLeft: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 112,
        y: 8,
        width: -20,
        height: 88,
      },
      {
        x: 90,
        y: 19,
        width: -20,
        height: 85,
      },
      {
        x: 102,
        y: 12,
        width: -20,
        height: 88,
      },
      {
        x: 80,
        y: 30,
        width: -20,
        height: 77,
      },
      {
        x: 70,
        y: 42,
        width: -20,
        height: 68,
      },
      {
        x: 38,
        y: 49,
        width: -20,
        height: 45,
      },
      {
        x: 55,
        y: 46,
        width: -20,
        height: 58,
      },
      {
        x: 28,
        y: 56,
        width: -20,
        height: 21,
      },
    ]
  },
  tailRight: {
    width: 120,
    height: 120,
    rectangles: [
      {
        x: 112,
        y: 49,
        width: -20,
        height: 19,
      },
      {
        x: 90,
        y: 42,
        width: -20,
        height: 46,
      },
      {
        x: 102,
        y: 45,
        width: -20,
        height: 33,
      },
      {
        x: 80,
        y: 38,
        width: -20,
        height: 58,
      },
      {
        x: 70,
        y: 35,
        width: -20,
        height: 69,
      },
      {
        x: 38,
        y: 20,
        width: -20,
        height: 88,
      },
      {
        x: 55,
        y: 28,
        width: -20,
        height: 84,
      },
      {
        x: 28,
        y: 16,
        width: -20,
        height: 88,
      },     
    ]
  },
} 

export { IMAGE_SOURCES };

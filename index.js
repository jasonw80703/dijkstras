// Dijkstras Javascript Implementation
// Jason Wang 2019
// To represent the graph, use a matrix with indices i, j such that
// matrix[i][j] represent the weight connecting node i and node j
// if matrix[i][j] === 0, then node i and node j are not connected


// For example, consider this simple graph
// (0) --4-- (1) --3-- (2)
// [0, 4, 0]
// [4, 0, 3]
// [0, 3, 0] would be the resulting matrix representation

// The resulting shortest path array would be [0, 4, 7]

/*
 * Helper method to find the smallest value distance node
 * in which it is not yet found
 * @param Array distances
 * @param Array spt
 * @return Integer index representing the minimum unfound distance
*/
function minimumUndiscoveredDistance(distances, spt) {
  let min = Infinity;
  let minIndex = -1;

  for (let i = 0; i < distances.length; i++) {
    if (!spt[i] && distances[i] <= min) {
      min = distances[i];
      minIndex = i;
    }
  }

  return minIndex;
}

/*
 * Main method to calculate the shortest path to each node from the starting node
 * @param Matrix graph
 * @param Integer source
 * @return Array shortest path mapping to each node index
*/
function calculateDijkstra(graph, source) {
  const n = graph.length; // number of nodes
  let distances = new Array(n); // output array
  let spt = new Array(n); // boolean array that tracks if index shortest path is found
  for (let i = 0; i < n; i++) {
    distances[i] = Infinity;
    spt[i] = false;
  }

  // set source node distance to 0
  distances[source] = 0;

  let minIndex;
  for (let i = 0; i < n - 1; i++) {
    minIndex = minimumUndiscoveredDistance(distances, spt);
    spt[minIndex] = true;

    // loop through all nodes, finding adjacent nodes, and update
    // distance with found distance at minIndex
    for (let j = 0; j < n; j++) {
      if (!spt[j] && // not finalized yet
          graph[minIndex][j] !== 0 && // 0 means it's the same, or if distance is 0, skip
          distances[minIndex] !== Infinity && // check that the minIndex distance is not infinity
          distances[minIndex] + graph[minIndex][j] < distances[j]) { // new distance is less than the existing distance
        // found a shorter path, so set it to the distance at the adjacent node
        distances[j] = distances[minIndex] + graph[minIndex][j];
      }
    }
  }
  return distances;
}

/*
 * Method to append to the table with Dijkstras index mapping to shortest distance
 * @param Array distances
*/
function tableDijkstra(distances, heading) {
  const tBody = document.getElementById('body');
  tBody.innerHTML = ""; // clear the previous table
  distances.map(function(item, index) {
    const tRow = tBody.insertRow(index);
    const tCell0 = tRow.insertCell(0);
    const tCell1 = tRow.insertCell(1);
    tCell0.appendChild(document.createTextNode(index));
    tCell1.appendChild(document.createTextNode(item));
  });
  document.getElementById('main').className = ""; // unhide the table
  document.getElementById('example').innerHTML = heading;
}

// Examples
// (0) --4-- (1) --3-- (2)
// [0, 4, 0]
// [4, 0, 3]
// [0, 3, 0]
function example1() {
  let size = 3;
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = new Array(size);
  }
  matrix[0][1] = 4;
  matrix[1][0] = 4;
  matrix[1][2] = 3;
  matrix[2][1] = 3;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === undefined) {
        matrix[i][j] = 0;
      }
    }
  }
  let distances = calculateDijkstra(matrix, 0);
  tableDijkstra(distances, 'Example1');
}

//     /--4-- (1) --3--\
// (0)                  (2)
//     \--1-- (3) --3--/
// [0, 4, 0, 1]
// [4, 0, 3, 0]
// [0, 3, 0, 3]
// [1, 0, 3, 0]
function example2() {
  let size = 4;
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = new Array(size);
  }
  matrix[0][1] = 4;
  matrix[0][3] = 1;
  matrix[1][0] = 4;
  matrix[1][2] = 3;
  matrix[2][1] = 3;
  matrix[2][3] = 3;
  matrix[3][0] = 1;
  matrix[3][2] = 3;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === undefined) {
        matrix[i][j] = 0;
      }
    }
  }
  let distances = calculateDijkstra(matrix, 0);
  tableDijkstra(distances, 'Example2');
}

// example from https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#/media/File:Dijkstra_Animation.gif
// [0, 7, 9, 0, 0, 14]
// [7, 0, 10, 15, 0, 0]
// [9, 10, 0, 11, 0, 2]
// [0, 15, 11, 0, 6, 0]
// [0, 0, 0, 6, 0, 9]
// [14, 0, 2, 0, 9, 0]
function example3() {
  let size = 6;
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = new Array(size);
  }
  matrix[0][1] = 7;
  matrix[0][2] = 9;
  matrix[0][5] = 14;
  matrix[1][0] = 7;
  matrix[1][2] = 10;
  matrix[1][3] = 15;
  matrix[2][0] = 9;
  matrix[2][1] = 10;
  matrix[2][3] = 11;
  matrix[2][5] = 2;
  matrix[3][1] = 15;
  matrix[3][2] = 11;
  matrix[3][4] = 6;
  matrix[4][3] = 6;
  matrix[4][5] = 9;
  matrix[5][0] = 14;
  matrix[5][2] = 12;
  matrix[5][4] = 9;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === undefined) {
        matrix[i][j] = 0;
      }
    }
  }
  let distances = calculateDijkstra(matrix, 0);
  tableDijkstra(distances, 'Example3');
}

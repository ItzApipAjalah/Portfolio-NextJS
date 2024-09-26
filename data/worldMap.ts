interface CountryData {
  name: string;
  coordinates: number[][][];
}

export const worldMapData: Map<string, CountryData> = new Map([
  ['USA', { name: 'United States', coordinates: [[[-125, 24], [-66, 24], [-66, 49], [-125, 49], [-125, 24]]] }],
  ['CAN', { name: 'Canada', coordinates: [[[-140, 41], [-52, 41], [-52, 83], [-140, 83], [-140, 41]]] }],
  ['MEX', { name: 'Mexico', coordinates: [[[-118, 14], [-86, 14], [-86, 32], [-118, 32], [-118, 14]]] }],
  ['BRA', { name: 'Brazil', coordinates: [[[-74, -34], [-34, -34], [-34, 5], [-74, 5], [-74, -34]]] }],
  ['RUS', { name: 'Russia', coordinates: [[[20, 41], [190, 41], [190, 82], [20, 82], [20, 41]]] }],
  ['CHN', { name: 'China', coordinates: [[[73, 18], [135, 18], [135, 54], [73, 54], [73, 18]]] }],
  ['IND', { name: 'India', coordinates: [[[68, 7], [97, 7], [97, 35], [68, 35], [68, 7]]] }],
  ['AUS', { name: 'Australia', coordinates: [[[113, -44], [154, -44], [154, -10], [113, -10], [113, -44]]] }],
  ['GBR', { name: 'United Kingdom', coordinates: [[[-5, 50], [2, 50], [2, 59], [-5, 59], [-5, 50]]] }],
  ['FRA', { name: 'France', coordinates: [[[-5, 42], [8, 42], [8, 51], [-5, 51], [-5, 42]]] }],
  ['DEU', { name: 'Germany', coordinates: [[[5, 47], [15, 47], [15, 55], [5, 55], [5, 47]]] }],
  ['JPN', { name: 'Japan', coordinates: [[[129, 31], [146, 31], [146, 46], [129, 46], [129, 31]]] }],
  ['ZAF', { name: 'South Africa', coordinates: [[[16, -35], [33, -35], [33, -22], [16, -22], [16, -35]]] }],
  ['ARG', { name: 'Argentina', coordinates: [[[-74, -55], [-53, -55], [-53, -21], [-74, -21], [-74, -55]]] }],
  ['EGY', { name: 'Egypt', coordinates: [[[24, 22], [37, 22], [37, 32], [24, 32], [24, 22]]] }],
]);
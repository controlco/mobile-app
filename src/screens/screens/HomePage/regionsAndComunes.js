import axios from 'axios';

export async function getComunesAndRegions() {
  const regions = await axios
    .get('http://desarrollosoftware.tk/regions/')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
  const districts = await axios
    .get('http://desarrollosoftware.tk/districts/')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
  regionsAndComunes = {regions: [], comunes: {}};
  regions.forEach(region => {
    regionsAndComunes.regions.push({
      key: region.number,
      label: region.name,
    });
    let comunes = districts.filter(dist => dist.region === region.number);
    let index = 0;
    regionsAndComunes.comunes[region.name] = comunes.map(comun => ({
      key: index++,
      label: comun.name,
      id: comun.id,
    }));
  });
  return regionsAndComunes;
}

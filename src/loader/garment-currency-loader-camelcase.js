import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/garment-currencies';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("core");

  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
    .then(results => {
      return results.data.map(x => {
        return {
          Id: x.Id,
          Code: x.code,
          Date: x.date,
          Rate: x.rate
        }
      });
    });
}

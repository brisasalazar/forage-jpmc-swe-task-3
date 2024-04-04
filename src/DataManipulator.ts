import { ServerResponse } from 'http';
import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  upper_bound: number,
  lower_bound: number,
  ratio: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]) : Row {
    const price_ABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) /2;
    const price_DEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) /2;
    const ratio = price_ABC / price_DEF;
    const upperBound = 1 + .05;
    const lowerBound = 1 - .05;
    return {
        price_abc: price_ABC,
        price_def: price_DEF,
        ratio,
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? 
                    serverRespond[0].timestamp : serverRespond[1].timestamp,
        upper_bound: upperBound, 
        lower_bound: lowerBound, 
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio:undefined,
      };
    }
  }


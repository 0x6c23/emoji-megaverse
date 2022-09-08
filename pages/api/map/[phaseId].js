import {withErrors} from '/utils/api/errors/index.js';
import {drawDiagonalCross, getCurrentGoal} from '/lib/api/map/index.js';
import {getValidJson} from '/utils/json/index.js';

/**
 * Used for the 'cheat code' templates
 */
async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      const {phaseId} = req.query;

      if (!phaseId || !parseInt(phaseId)) {
        return res.status(500).
                   json({success: false, message: 'Invalid phase ID'});
      }

      switch (parseInt(phaseId)) {
        case 1: {
          /* using the goal API seemed too easy for phase 1 */
          const arr = await drawDiagonalCross(11, 11, 2);
          return res.status(200).json(arr);
        }
        case 2: {
          const arr = await getCurrentGoal();
          const json = getValidJson(arr);
          if (!json || !json?.goal) {
            return res.status(500).
                       json({success: false, message: 'Could not get goal!'});
          }

          const {goal} = json;

          /* A little messy to have this in here.. Can be separated into /lib/api */
          const returnArr = [];
          for (let y = 0; y < goal.length; y++) {
            returnArr[y] = [];
            for (let x = 0; x < goal[y].length; x++) {
              const splitValue = goal[y][x].split('_');
              const hasOptions = splitValue.length > 1;
              const options = {};

              if (hasOptions) {
                switch (splitValue[0]) {
                  case 'LEFT': {
                    options.direction = 'left';
                    break;
                  }
                  case 'RIGHT': {
                    options.direction = 'right';
                    break;
                  }
                  case 'UP': {
                    options.direction = 'up';
                    break;
                  }
                  case 'DOWN': {
                    options.direction = 'down';
                    break;
                  }
                  case 'WHITE': {
                    options.color = 'white';
                    break;
                  }
                  case 'PURPLE': {
                    options.color = 'purple';
                    break;
                  }
                  case 'BLUE': {
                    options.color = 'blue';
                    break;
                  }
                  case 'RED': {
                    options.color = 'red';
                    break;
                  }
                }
              }

              returnArr[y][x] = {
                emoji: hasOptions ? splitValue[1] : splitValue[0],
                ...options,
              };
            }
          }
          return res.status(200).json(returnArr);
        }
        default: {
          return res.status(404).
                     json({success: false, message: 'Phase ID not found'});
        }
      }
    }
    default:
      res.setHeader('Allow', [
        'GET',
      ]);
      return res.status(405).end(`Method ${ req.method } Not Allowed`);
  }
}

export default withErrors(handler);

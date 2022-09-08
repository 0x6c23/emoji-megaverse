import {withErrors} from '/utils/api/errors/index.js';
import {getCurrentGoal} from '/lib/api/map/index.js';

async function handler(req, res) {
  switch(req.method) {
    case "GET": {
      return getCurrentGoal()
      .then(goal => {
        return res.status(200).json(goal)
      })
    }
    default:
      res.setHeader("Allow", [
        "GET",
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withErrors(handler)

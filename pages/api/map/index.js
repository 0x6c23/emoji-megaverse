import {withErrors} from '/utils/api/errors/index.js';
import {getCurrentMap, postCurrentMap, deleteCurrentMap} from '/lib/api/map/index.js';

async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      const map = await getCurrentMap()
      return res.status(200).json(map);
    }
    case 'POST': {
      const {map} = JSON.parse(req.body)
      await postCurrentMap(map)
      return res.status(200).send()
    }
    case 'DELETE': {
      await deleteCurrentMap()
      return res.status(200).send()
    }
    default:
      res.setHeader('Allow', [
        'GET',
        'POST',
        'DELETE',
      ]);
      return res.status(405).end(`Method ${ req.method } Not Allowed`);
  }
}

export default withErrors(handler);

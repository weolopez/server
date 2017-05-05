import { Router, Request, Response, NextFunction } from 'express';
var Git = require("nodegit");

const Heroes = require('../data');

export class HeroRouter {
  router: Router

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Heroes);
  }

  /**
   * GET one hero by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.id);
    let hero = Heroes.find(hero => hero.id === query);
    if (hero) {
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          hero
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No hero found with the given id.',
          status: res.status
        });
    }
  }

  public change(req: Request, res: Response, next: NextFunction) {

    if (req.body.command === 'pull') {
      Git.Clone("https://github.com/nodegit/nodegit", "nodegit").then(function(repository) {
  // Work with the repository object here.
      });
      res.status(200)
        .send({
          message: req.body.command,
          status: res.status
        });
    }
    else res.status(200)
      .send({
        message: req.body.hello,
        status: res.status
      });

  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.post('/', this.change);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;


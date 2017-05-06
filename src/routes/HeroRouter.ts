import { Router, Request, Response, NextFunction } from 'express';
var Git = require("nodegit")
, bodyParser = require('body-parser');

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
var o = JSON.parse(req.body.payload);
	
//traverse(o, process);
//console.log( JSON.stringify(req.body, 4) );
    //if (req.body.command === 'pull') {
  // Work with the repository object here.
     // });
    //}
//    Git.pull("https://github.com/weolopez/server", "weolopez").then(function(repository) {
const
    spawn = require( 'child_process' ).spawnSync,
    ls = spawn( 'git', ['pull'] );
    

console.log( `stderror: ${ls.stderr.toString()}` );
console.log( `stdout: ${ls.stdout.toString()}` );

    res.status(200)
      .send({
        message: ls.stdout.toString(),
        status: res.status
      });

//called with every property and its value
function process(key,value) {
    console.log(key + " : "+value);
}

 function traverse(o,func) {
    for (var i in o) {
        func.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
            //going one step down in the object tree!!
	    console.log('GOING DOWN ANOTHER OBJECT');
            traverse(o[i],func);
        }
    }
}
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {

    this.router.use(bodyParser.json());


    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.post('/', this.change);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;


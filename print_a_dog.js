/*
    Name:       Mihir Patel
    Note:       Please download the appropriate node_module for jpg since "node install"
                doesn't download this folder. And without it I get the error. Alternate, you can place the 
                jpgjs inside the node_module; it isincluded with this submission. 

                Link is:
                https://github.com/notmasteryet/jpgjs

                Download the .zip, extract and rename the folder to "jpgjs" and move to 
                node_modules folder of project 6.
*/
/*Libraries */
const R = require('ramda')
const FS = require('fs')
const TERMIMAGE = require ('terminal-image')
const GOT = require('got')
/* dogs file import*/
const DOGS = JSON.parse(FS.readFileSync('dogs.json', 'utf8'));
/*getting a link */
const FLICKRIMAGE = R.pipe(R.prop('items'), R.map(R.prop('media')), R.map(R.prop('m')));
/*getting the a random image between 0 and 8- nth link, if invalid number then just print 0th link*/
const FUNC = (par_a, par_b)=> {
    if(!(par_a < 0 || par_a > 19 || par_a === undefined)){ par_a = 0; }
    else { par_a = Math.floor(Math.random()*9); }
    return R.compose(R.nth(par_a)) (par_b);
}
/*Pulling a link from the dogs.json file, putting the image on the console */
(async () => { 
    const {body} = await GOT(FUNC(process.argv[2], FLICKRIMAGE(DOGS)), {encoding: null});
    console.log(await TERMIMAGE.buffer(body));
}) ();

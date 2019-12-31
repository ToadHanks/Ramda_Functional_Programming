const R = require('ramda');

/* ********************************************************************************************** */
/* ****************************          Predicate  Methods           *************************** */
/* ********************************************************************************************** */
// Check if value of x is 0. Return true if x is 0, false otherwise.
const isZero = x => x === 0;

// Check if value of the input is Alphanumeric. Return true if it is, false otherwise.
const isAlphaNumeric = R.compose(isZero, R.length(), R.match(/[^a-zA-Z0-9]/g));

// Compare to string (Commonly used for sorting strings). Return true string a is less than string
// b, false otherwise.
const compareStrings = R.comparator((a, b) => a < b);

// Takes a property (prop) of an object and converts it to a JS date object. Useful for the
// 'date_taken' property of Flickr data. Use: lensPropToJSDate('date_taken') => Date Object. Returns
// Date object
const lensPropToJSDate = prop => R.over(R.lensProp(prop))(item => new Date(item));

/* ********************************************************************************************** */
/* ****************************            Helper Methods             *************************** */
/* ********************************************************************************************** */
// Takes input of 1 or more string object separated by spaces (like the tags of the flickr data) in
// arrays, and turns them into an array of single word string objects.
const combineStringArray = R.compose(
  R.split(' '),
  R.join(' '),
);

/* ********************************************************************************************** */
/* **************************** Filtering Properties From Flickr JSON *************************** */
/* ********************************************************************************************** */
// Returns the array of objects in the item property
const flickrImageData = R.compose(
  R.prop('items'),
);

// Returns an array of combined tags of all images in the items property
const flickrTags = R.compose(
  combineStringArray,
  R.map(R.prop('tags')),
  flickrImageData,
);

// Returns an array titles for the images in the items property
const flickrTitles = R.compose(
  R.map(R.prop('title')),
  flickrImageData,
);

/* ********************************************************************************************** */
/* ****************************         OTHER Helper Methods          *************************** */
/* ********************************************************************************************** */
const filterAlphaNumeric = R.compose(
  R.filter(item => isAlphaNumeric(item)),
  combineStringArray,
);

const filterNotAlphaNumeric = R.compose(
  R.filter(item => !isAlphaNumeric(item)),
  combineStringArray,
);

const lowerCaseUniq = R.compose(
  R.uniq(),
  R.map(item => R.toLower(item)),
);

/* ********************************************************************************************** */
/* ****************************   Functions Required For Assignment   *************************** */
/* ********************************************************************************************** */
/*Name:     Mihir K Patel */
/*Purpose:  Create and learn pure functions using pipe/compose functions.*/

/*Returns the count/length of the flicker urls */
const imageCount = (cnt_img) => {
  return flickrImageData(cnt_img).length;
}
/*Returns the unique alpha numeric tags after the sorting, and then filtering */
const alphaNumericTagsUniq = (alpha_tags) => {
  return R.compose(R.sort(compareStrings), lowerCaseUniq, filterAlphaNumeric, flickrTags) (alpha_tags);
}
/* Returns the alphabetical tags only*/
const nonAlphaNumericTags = (nonalpha_tags) => {
  return R.compose(filterNotAlphaNumeric, flickrTags) (nonalpha_tags);
}
/*Uses the mean function to return the average of #s of titles */
const avgTitleLength = (avg_tit_len) => {
  return R.compose(R.mean(), R.map(R.length()), flickrTitles) (avg_tit_len);
}
/*Uses Currying- gorups & pairs and then checks the frequency of the tags and returns it. Then tags get sorted
 agains by frequency in ascending order and returns the rank*/
const commonTagByRank = rank => (tags_rank) => {
  return R.pipe(flickrTags, R.groupBy(x=>x), R.toPairs(), R.map(x=>{
    return{key: x[0], freq: R.length(x[1])}
  }), R.sortBy(x=>x.freq), R.reverse(), R.nth(rank), R.prop('key')) (tags_rank);
}
/* Sorts with date, and sees the date at 0th index and returns its title*/
const oldestPhotoTitle = (old_tit) => {
  return R.pipe(flickrImageData, R.sortBy(R.prop('date_taken')), R.view(R.lensIndex(0)), R.prop('title')) (old_tit);
}
/* ********************************************************************************************** */
/* ********************************************************************************************** */
/* ****************************          All JSON Test Code           *************************** */
/* ****************************             DO NOT ALTER              *************************** */
/* ********************************************************************************************** */
/* ********************************************************************************************** */
const fs = require('fs');
const {
  makePromiseTest, runAllPromiseTest, alphaNumericTagsUniqTest1, alphaNumericTagsUniqTest2,
} = require('./testsetup');

const flickrDataDog = JSON.parse(fs.readFileSync('dogs.json', 'utf8'));
const flickrDataLandscapes = JSON.parse(fs.readFileSync('landscapes.json', 'utf8'));

runAllPromiseTest([
  makePromiseTest('Is flickrDataDog an object?', typeof flickrDataDog, 'object'),
  makePromiseTest('Images count should be 20', imageCount(flickrDataDog), 20),
  makePromiseTest(
    'Should get an array of all the unique alphanumeric tags after transforming to lower case, '
    + 'sorted lexicographically',
    alphaNumericTagsUniq(flickrDataDog), R.sort(compareStrings)(alphaNumericTagsUniqTest1),
  ),
  makePromiseTest(
    'Should Only Be 1 non alphanumeric tag as "świnoujście"',
    R.compose(R.head, nonAlphaNumericTags)(flickrDataDog), 'świnoujście',
  ),
  makePromiseTest(
    'Average Title Length Should be 26 (Rounded)',
    R.compose(Math.round, avgTitleLength)(flickrDataDog), 26,
  ),
  makePromiseTest(
    'Third most common tag should be "puppy" (0 index, where 0 is most common)',
    commonTagByRank(2)(flickrDataDog), 'puppy',
  ),
  makePromiseTest(
    'Oldest Photo Taken Title Should Be "20160626_P1060675"',
    oldestPhotoTitle(flickrDataDog), '20160626_P1060675',
  ),
]);

runAllPromiseTest([
  makePromiseTest('Is flickrDataLandscapes an object?', typeof flickrDataLandscapes, 'object'),
  makePromiseTest('Images count should be 20', imageCount(flickrDataLandscapes), 20),
  makePromiseTest(
    'Should get an array of all the unique alphanumeric tags after transforming to lower case, '
    + 'sorted lexicographically',
    alphaNumericTagsUniq(flickrDataLandscapes), R.sort(compareStrings)(alphaNumericTagsUniqTest2),
  ),
  makePromiseTest(
    'Should not be any non-alphanumeric tags (resulting in an [])',
    R.compose(nonAlphaNumericTags)(flickrDataLandscapes), [],
  ),
  makePromiseTest(
    'Average Title Length Should be 16 (Rounded)',
    R.compose(Math.round, avgTitleLength)(flickrDataLandscapes), 16,
  ),
  makePromiseTest(
    'Third most common tag should be "landscaping" (0 index, where 0 is most common)',
    commonTagByRank(2)(flickrDataLandscapes), 'landscaping',
  ),
  makePromiseTest(
    'Oldest Photo Taken Title Should Be "Boats of Golyazi"',
    oldestPhotoTitle(flickrDataLandscapes), 'Boats of Golyazi',
  ),
]);

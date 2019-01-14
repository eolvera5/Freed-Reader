/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the Rich Site Summary
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test will loop through each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */

        it("to have an URL", function(){
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined;
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* Test will loop through each feed
         * in the allFeeds object and ensure it has a name defined
         * and that the name is not empty.
         */
        it("feed has a name", function(){
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined;
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /*Test suite named "The menu" */
    describe("The menu", function(){

        //variables to be used in both menu tests
        const bodyElement = document.querySelector("body");
        const menuItem = document.querySelector(".menu-icon-link");

        /* Test ensures the menu element is
         * hidden by default.
         */
        it("is hidden by default", function(){
            expect(bodyElement.classList).toContain("menu-hidden");
        });

         /* Test ensures the menu changes
          * visibility when the menu icon is clicked.
          * This test have two expectations:
          *     a. the menu display when clicked and
          *     b. it hides when clicked again.
          * The following source was helpful in identifying the best method [click()] to use to perform this test as all other attempts were unsuccessful
            1. https://matthewcranford.com/feed-reader-walkthrough-part-3-menu-test-suite/
        */
         it("switches between visible and hidden when clicked", function(){
            //verifies that the menu is invisible when clicked
            menuItem.click();
                expect(bodyElement.classList).not.toContain("menu-hidden");

            //verifies that the menu is visible when clicked
            menuItem.click()
                expect(bodyElement.classList).toContain("menu-hidden");
         });
    });
/*
The following sources did the best job explaning or simplifying the async tests. Please update course to do the same or provide a more thorough explanation in this subject
1. https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
2. https://github.com/PlaySnowi/Feed-Reader-Testing/blob/master/jasmine/spec/feedreader.js
*/
    /* Test suite named "Initial Entries" */
    describe("Initial Entries", function(){
        const feedContainer = document.getElementsByClassName("feed")[0].getElementsByClassName("entry");
        console.log(feedContainer); //verifies container contains at least one(1) .entry element

        /* Test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it("load feed completed its work", function(){
            expect(feedContainer.length).toBeGreaterThan(0);
        });
    });

 /* Test suite named "New Feed Selection" */
    describe("New Feed Selection", function(){

        /* Test ensures when a new feed is loaded
        *by the loadFeed function that the content actually changes.
        *loadFeed() is asynchronous.
        */

        //variables will hold feeds loaded by the loadFeed
        let firstFeed, secondFeed;

        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = document.querySelector(".entry").innerText;
                console.log(firstFeed); //verifies content

                loadFeed(1, function(){
                    secondFeed = document.querySelector(".entry").innerText;
                    console.log(secondFeed) //verifies content

                    done();
                });
            });
        });

        it("content changes", function(){
            expect(firstFeed === secondFeed).not.toBe(true);
        });
    });
}());

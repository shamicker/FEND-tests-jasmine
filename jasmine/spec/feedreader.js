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
    * a related set of tests. This suite is all about the RSS
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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have defined and not-empty URLs', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).toEqual(jasmine.any(String));
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each have a defined name that is not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).toEqual(jasmine.any(String));
            });
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function(){
            expect( $("body").hasClass('menu-hidden') ).toEqual(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should toggle visibility with each menu-icon click', function(){
            $(".menu-icon-link").click();
            expect( $("body").hasClass("menu-hidden") ).toEqual(false);

            $(".menu-icon-link").click();
            expect( $("body").hasClass("menu-hidden") ).toEqual(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function(){

        beforeAll(function(done){
            loadFeed(0, done);
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('calls loadFeed and has at least 1 .entry in the .feed container', function(done){
            expect( $( ".feed:has(.entry)").length ).toBeGreaterThan(-1);
            expect( $( ".feed .entry h2" )[0].innerHTML ).toEqual( jasmine.any(String) );
            done();
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        var entry0, entry1;

        beforeAll(function(done){
            // use 'window' as the object since 'loadFeed' method is global.
            spyOn(window, 'loadFeed').and.callThrough();

            // load feed to get entry0
            loadFeed(0, function(){
                entry0 = $(".entry h2").first()[0].innerHTML[0];

                // then load another feed to get entry1
                loadFeed(1, function(){
                    entry1 = $(".entry h2").first()[0].innerHTML[0];
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("loadFeed calls with different args should load different strings", function(){
            expect( entry0 ).toEqual( jasmine.any(String) );
            expect( entry1 ).toEqual( jasmine.any(String) );
            expect( entry0 == entry1 ).toEqual(false);
        });

    });
}());

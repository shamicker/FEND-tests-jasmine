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
        /* Ensures that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object
         * and ensures it has a URL defined
         * and that the URL is not empty.
         * And also that the URL is a string.
         */
         it('have defined, not-empty URLs that are strings', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
                expect(feed.url).toEqual(jasmine.any(String));
            });
         });


        /* Loops through each feed in the allFeeds object
         * and ensures it has a name defined
         * and that the name is not empty
         * and that the name is a string.
         */
         it('have defined, not-empty names that are strings', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
                expect(feed.name).toEqual(jasmine.any(String));
            });
         });
    });


    describe('The menu', function(){

        // Ensures the menu element is hidden by default.
        it('is hidden by default', function(){
            expect( $("body").hasClass('menu-hidden') ).toEqual(true);
        });

         /* Ensures the menu changes visibility when the menu icon is clicked.
          * The menu should display when clicked,
          *  and should hide when clicked again.
          */
        it('toggles visibility with each menu-icon click', function(){
            $(".menu-icon-link").click();
            expect( $("body").hasClass("menu-hidden") ).toEqual(false);

            $(".menu-icon-link").click();
            expect( $("body").hasClass("menu-hidden") ).toEqual(true);
        });
    });

    describe('Initial entries', function(){

        // read a lot of the forum for this, ending with https://discussions.udacity.com/t/step-13-help-initial-entries/14839/3
        beforeAll(function(done){
            loadFeed(0, done);
        });

        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
         it('calls loadFeed and has at least 1 .entry in the .feed container', function(){
            expect( $( ".feed:has(.entry)").length ).toBeGreaterThan(-1);
            expect( $( ".feed .entry h2" )[0].innerHTML ).toEqual( jasmine.any(String) );
         });
    });

    describe('New Feed Selection', function(){
        var entry0, entry1;

        beforeAll(function(done){
            // Use 'window' as the object since 'loadFeed' method is global.
            // From https://stackoverflow.com/questions/9510148/using-jasmine-to-spy-on-a-function-without-an-object
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

        /* Ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it("loadFeed calls with different args should load different strings", function(){

            // verify that the first feed is a defined, non-empty string
            expect( entry0 ).toBeDefined();
            expect( entry0 ).not.toEqual("");
            expect( entry0 ).toEqual( jasmine.any(String) );

            // verify that the second feed is a defined, non-empty string
            expect( entry1 ).toBeDefined();
            expect( entry1 ).not.toEqual("");
            expect( entry1 ).toEqual( jasmine.any(String) );

            // verify that the first feed is different from the second feed
            expect( entry0 == entry1 ).toEqual(false);
        });
    });
}());

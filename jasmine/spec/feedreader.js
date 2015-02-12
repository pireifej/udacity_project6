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

                /* A test that loops through each feed
                 * in the allFeeds object and ensures it has a URL defined
                 * and that the URL is not empty.
                 */
				it('URLs are defined', function() {
					allFeeds.forEach(function(feed) {
						expect(feed.url).toBeDefined();
						expect(feed.url.length).not.toBe(0);
					});
				});

                /* A test that loops through each feed
                 * in the allFeeds object and ensures it has a name defined
                 * and that the name is not empty.
                 */
				it('names are defined', function() {
					allFeeds.forEach(function(feed) {
						expect(feed.name).toBeDefined();
						expect(feed.name.length).not.toBe(0);
					});
				});
            });

        /* A new test suite named "The menu" */
		describe('The menu', function() {
			/* A test that ensures the menu element is
			* hidden by default. You'll have to analyze the HTML and
			* the CSS to determine how we're performing the
			* hiding/showing of the menu element.
			*/
			it('menu hidden by default', function() {
				expect($('body').attr("class")).toBe("menu-hidden");
			});

	        /* A test that ensures the menu changes
    	     * visibility when the menu icon is clicked. This test
        	 * should have two expectations: does the menu display when
	         * clicked and does it hide when clicked again.
    	     */
			it('menu changes visibility', function() {
					$(".menu-icon-link").trigger("click");
					expect($('body').attr("class")).not.toBe("menu-hidden");

					$(".menu-icon-link").trigger("click");
					expect($('body').attr("class")).toBe("menu-hidden");
			});

	        /* NEW: A test that ensures the menu hides when a menu
             * item is clicked. 
    	     */
			it('menu item changes visibility', function() {
					$(".menu").find("a").trigger("click");
                    expect($('body').attr("class")).toBe("menu-hidden")
			});
		});

        /* A new test suite named "Initial Entries" */
		describe('Initial Entries', function() {
	        /* A test that ensures when the loadFeed
    	     * function is called and completes its work, there is at least
	         * a single .entry element within the .feed container.
    	     * Remember, loadFeed() is asynchronous so this test wil require
        	 * the use of Jasmine's beforeEach and asynchronous done() function.
	         */
			beforeEach(function(done) {
				loadFeed(0, done);
			});

			it('loadFeed populates feed container', function(done) {
				expect($(".feed").find(".entry").length).toBeGreaterThan(0);
                done();
			});
		});

        /* A new test suite named "New Feed Selection" */
		describe('New Feed Selection', function() {
           /* A test that ensures when a new feed is loaded
           * by the loadFeed function that the content actually changes.
           * Remember, loadFeed() is asynchronous.
           */
			var initialContent = $(".feed").html();

			beforeEach(function(done) {
				loadFeed(0, done);
			});

			it('content actually changes', function(done) {
				var newContent = $(".feed").html();
				expect(newContent).not.toBe(initialContent);
				done();
			});

           /* NEW: A test that ensures when a new feed is loaded
           * by the loadFeed function that the hyperlink
           * actually exists.
           */
			it('hyperlinks actually exist', function(done) {
				var url = $(".feed").find(".entry-link").attr("href");
				expect(url).toBeDefined();
				expect(url.length).not.toBe(0);
				done();
			});

           /* NEW: A test that ensures when all feeds are loaded
           * by the loadFeed function that both the article title and blurb
           * are generated on screen . This fails because the first feed
           * has a header but no paragraph.
           */
			beforeEach(function(done) {
				for (var i = 0; i < allFeeds.length; i++) {
					loadFeed(i, done);
				}
			});

			it('article entries have h2 and p', function(done) {
				var entry = $(".feed").find(".entry");
				var h2 = entry.find("h2").html();
				var p = entry.find("p").html();

				expect(h2).toBeDefined();
				expect(h2.length).not.toBe(0);

				expect(p).toBeDefined();
				expect(p.length).not.toBe(0);

				done();
			});

		});

}());
// replace xdescribe with describe to run this test
describe('Home page', () => {
  beforeEach((client, done) => {
    console.log('\tSet window size 1920x1024'); // eslint-disable-line
    client.resizeWindow(1920, 1024);
    done();
  });

  afterEach((client, done) => {
    if (client.sessionId) {
      client.end(() => {
        done();
      });
    } else {
      done();
    }
  });

  it('has a Hello World text', (browser) => {
    browser.url(`${browser.launchUrl}/login`)
      .waitForElementVisible('body', 1000)
      .saveScreenshot('screenshots/home.png')
      .expect.element('div').text.to.contain('Hello World');

    // console.log(browser);
  });
});

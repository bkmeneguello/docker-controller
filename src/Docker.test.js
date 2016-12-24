import xhr from 'xhr-mock';
import Docker from './Docker';

window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeEach(() => {
  xhr.setup();
});

afterEach(() => {
  xhr.teardown();
});

it('Example', async () => {
  xhr.get('http://localhost:2375/info', function(req, res) {
    //return null;              //simulate an error
    //return res.timeout(true); //simulate a timeout
    return res
      .status(200)
      .header('Content-Type', 'application/json')
      .body(JSON.stringify({data: {
        first_name: 'John', last_name: 'Smith'
      }}));
  });
  const info = await new Docker('http://localhost:2375').loadInfo();
  expect(info).not.toBeNull();
});

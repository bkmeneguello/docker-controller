import xhr from 'xhr-mock';
import Docker from './Docker';

window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeEach(() => {
  xhr.setup();
});

afterEach(() => {
  xhr.teardown();
});

test('Docker load info', async () => {
  const infoMock = {
    ID: 'XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX'
  };
  xhr.get('http://localhost:2375/info', (req, res) => {
    return res
      .status(200)
      .header('Content-Type', 'application/json')
      .body(JSON.stringify(infoMock));
  });
  const info = await new Docker('http://localhost:2375').loadInfo();
  expect(info).toEqual(infoMock);
});

test('Docker create image', async () => {
  const chunks = [
    {status: "Pulling from library/ubuntu", id: "latest"},
    {status: "Pulling fs layer", progressDetail: {status: "Pulling fs layer"}, id: "xxxxxxxxxxxxx"},
    {status: "Waiting", progressDetail: {status: "Waiting"}, id: "xxxxxxxxxxxxx"},
    {status: "Downloading", progressDetail: {current: 1000, total: 2000000}, progress: "[>                                                  ] 1.0 kB/2.0 MB", id: "xxxxxxxxxxxxx"},
    {status: "Digest: sha256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
    {status: "Status: Downloaded newer image for ubuntu:latest"}
  ];
  xhr.post('http://localhost:2375/images/create?fromImage=ubuntu&tag=latest', (req, res) => {
    return res
      .status(201)
      .header('Content-Type', 'application/json')
      .header('Transfer-Encoding', 'chunked')
      .body(chunks.map(chunk => JSON.stringify(chunk)).join('\n'));
  });
  const progress = jest.fn();
  const image = await new Docker('http://localhost:2375').createImage({fromImage: 'ubuntu', tag: 'latest'}, progress);
  expect(progress).toHaveBeenCalledTimes(chunks.length);
  chunks.forEach(chunk => {
    expect(progress).toHaveBeenCalledWith(chunk);
  })
});

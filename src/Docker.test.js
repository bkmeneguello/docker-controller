import Docker from './Docker';

it('Example', async () => {
  const info = await new Docker('http://localhost:2375').createImage({fromImage: 'busybox', tag: 'latest'});
  console.log(info);
});

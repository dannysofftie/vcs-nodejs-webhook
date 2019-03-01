import { execFile, spawnSync } from 'child_process';
import * as http from 'http';
import { promisify } from 'util';

const exec = promisify(execFile);

const file = '/home/danny/app/vcs-nodejs-webhook/pull-changes.sh';

http.createServer(function(req, res) {
    if (req.method == 'GET') {
        res.end(JSON.stringify({ message: 'listener' }));
    }

    req.on('data', function(chunk) {
        (async () => {
            spawnSync('chmod 755', [file]);
            const { stderr, stdout } = await exec(file);
            stderr && console.log('Error ', stderr);
            console.log(stdout);
        })().catch(err => {
            console.log(err);
        });
    });

    res.end();
}).listen(5670, function() {
    console.log('Webhook listener running on port', 5670);
});

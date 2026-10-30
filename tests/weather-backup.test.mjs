import test from 'node:test';
import assert from 'node:assert/strict';
import {applyWeatherBackup, WEATHER_BACKUP} from '../src/utils/sage/weatherBackup.ts';

test('outdoor attractions cannot remain the generated heat or storm fallback',()=>{
 const input={title:'Papago morning',backupPlan:'If weather is unsuitable, visit the zoo or botanical garden.',facilities:{shade:'Limited'},cautions:['Confirm access.']};
 const output=applyWeatherBackup(input);
 assert.equal(output.backupPlan,WEATHER_BACKUP);
 assert.match(output.backupPlan,/postpone|indoor, air-conditioned/);
 assert.equal(output.title,input.title);
 assert.deepEqual(output.facilities,input.facilities);
 assert.deepEqual(output.cautions,input.cautions);
 assert.notEqual(input.backupPlan,output.backupPlan);
 assert.deepEqual(applyWeatherBackup(output),output);
});

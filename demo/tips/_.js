'use strict'
var _ = require('underscore');


var report_rs = [{_id:{a:1,b:2},value:{name:'tom',cost:10.5}},{_id:{a:2,b:4},value:{name:'jerry',cost:112}},{_id:{a:8,b:12},value:{name:'kiki',cost:98.78666}}];

var fixed_arr = ['cost','a'];
var datatype = report_rs.type || 'object';

var result = [];
if (report_rs.length > 0) {
	if (datatype === 'object') {

	} else {
		var header = _.union(_.keys(report_rs[0]._id), _.keys(report_rs[0].value));
		result.push(header);
	}
	
	_.map(report_rs,function(val){
		var n_val = val.value;
		_.each(_.keys(val.value),function(v){
			if (_.contains(fixed_arr,v)) {
				n_val[v] = Number(n_val[v].toFixed(3));
			}
		});
		var new_val = _.extend(val._id,n_val);

		if (datatype === 'object') {
			result.push(new_val);
		} else {
			result.push(_.values(new_val));
		}		 
	});


} else{
	// list empty
}

console.log(_.groupBy(result,function(v){
	return v.name;
}));
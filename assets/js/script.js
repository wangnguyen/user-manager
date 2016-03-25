/**
 * Created by quangnguyen on 3/20/16.
 */
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

var Lib = {
    drawChart:function(user, selector){
        if(!user)
            return;
        var skills = [];
        var per = 100 / user.skills.length;
        for(var i = 0; i < user.skills.length; i++){
            if(i === 0){
                skills.push(
                    {
                        name: user.skills[i],
                        y: per,
                        sliced: true,
                        selected: true
                    }
                )
            }else{
                skills.push(
                    {
                        name: user.skills[i],
                        y: per
                    }
                )
            }

        }
        $(selector).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                margin: [0, 20, 20, 20],

            },
            title: {
                text: user.name
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    size:'90%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Skill',
                colorByPoint: true,
                data: skills
            }]
        });
    },
    cleanArr:function(arr) {
        arr = $.unique(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == '') {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr;
    }
};
import utils from '../../helpers/utils';
import chart from '../../helpers/randChart';

import staffOverview from './staffOverview';

const showChart = () => chart.randomChart('16A2B8', '', '', 1000, 'dash-card-overview');

const printOverviewDashboard = () => {
  let domString = '';
  domString += '<div class="container-fluid mt-5">';
  domString += '  <div class="row my-4">';
  domString += '    <div class="col-md-8 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Staff Overview</h2></div>';
  domString += '        <div class="card-body dash-card"><div class="d-flex flex-row justify-content-around">';
  domString += staffOverview.buildStaffOverview();
  domString += '        </div></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Dinos Overview</h2></div>';
  domString += '        <div class="card-body dash-card"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '  </div>';
  domString += '  <div class="row my-4">';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Rides Overview</h2></div>';
  domString += '        <div class="card-body dash-card"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Equipment Overview</h2></div>';
  domString += '        <div class="card-body dash-card"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Vendors Overview</h2></div>';
  domString += '        <div class="card-body dash-card"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-12">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Activity Monitor</h2></div>';
  domString += '        <div id="dash-card-overview" class="card-body"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '  </div>';
  domString += '</div>';
  utils.printToDom('overview-dashboard', domString);
  $(document).ready(showChart);
};

export default { printOverviewDashboard };

import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';
import vendorsData from '../../helpers/data/vendorsData';


// ---  EVENT FUNCTIONS  --- //

const deleteVendorEvent = (e) => {
  const vendorId = e.target.closest('.card').id;

  vendorsData.deleteVendor(vendorId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printVendorsDashboard();
    })
    .catch((err) => console.error('problem with delete vendor event', err));
};

const newVendorEvent = (e) => {
  e.preventDefault();
  const newVendorName = $('#vendor-name').val();
  const newVendorDescription = $('#vendor-description').val();
  const myUid = firebase.auth().currentUser.uid;


  const newVendor = {
    name: newVendorName,
    description: newVendorDescription,
    isOpen: true,
    uid: myUid,
  };

  vendorsData.addVendor(newVendor)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printVendorsDashboard();
    })
    .catch((err) => console.error('problem with add vendor in new vendor event', err));
};

const updateVendorEvent = (e) => {
  e.preventDefault();
  console.log('in edit vendor');
};

const newVendorFormEvent = () => {
  $('#new-vendor-form-containter').removeClass('hide');
  $('#update-vendor-form-containter').addClass('hide');

  // eslint-disable-next-line no-use-before-define
  newVendorForm();
};

const updateVendorFormEvent = (e) => {
  $('#new-vendor-form-containter').addClass('hide');
  $('#update-vendor-form-containter').removeClass('hide');

  const vendorId = e.target.closest('.card').id;

  // eslint-disable-next-line no-use-before-define
  updateVendorForm(vendorId);

  console.log('vendorId', vendorId);
};


// ---  DOMSTRING FUNCTIONS  --- //

const newVendorForm = () => {
  let domString = '';

  domString += '<form class="card col-8 offset-2 mb-4 pt-4 pl-4 pr-4 new-vendor-form-tag">';
  domString += '  <div class="form-group">';
  domString += '    <label class="font-weight-bold" for="vendor-name">Vendor Name</label>';
  domString += '    <input type="text" class="form-control mb-3" id="vendor-name" placeholder="Enter your vendor name">';
  domString += '    <label class="font-weight-bold" for="vendor-description">Vendor Description</label>';
  domString += '    <textarea type="text" class="form-control mb-3" id="vendor-description" placeholder="Enter your vendor description"></textarea>';
  domString += '    <button type="submit" class="btn btn-danger float-right" id="vendor-creator-btn">Add Vendor</button>';
  domString += '  </div>';
  domString += '</form>';

  utils.printToDom('new-vendor-form-containter', domString);
};

const updateVendorForm = (vendorId) => {
  console.log('vendorId', vendorId);


  let domString = '';

  domString += '<form class="card col-8 offset-2 mb-4 pt-4 pl-4 pr-4 update-vendor-form-tag">';
  domString += '  <div class="form-group">';
  domString += '    <label class="font-weight-bold" for="vendor-name">Edit Vendor Name</label>';
  domString += '    <input type="text" class="form-control mb-3" id="vendor-name" placeholder="Edit  your vendor name" value="Name">';
  domString += '    <label class="font-weight-bold" for="vendor-description">Edit Vendor Description</label>';
  domString += '    <textarea type="text" class="form-control mb-3" id="vendor-name" placeholder="Edit your vendor description">Description</textarea>';
  domString += '    <button type="submit" class="btn btn-danger float-right" id="vendor-modifier-btn">Update Vendor</button>';
  domString += '  </div>';
  domString += '</form>';

  utils.printToDom('update-vendor-form-containter', domString);
};

const printVendorsDashboard = () => {
  vendorsData.getVendors()
    .then((vendors) => {
      let domString = '';

      domString += '<h2 class="text-light text-center">Vendors</h2>';
      domString += '<div class="d-flex justify-content-center mb-4" id="add-pin-container">';
      domString += '<button class="btn dashboard-btn" id="new-vendor-btn" type="button"><i class="fas fa-plus dashboard-icon"></i></button>';
      domString += '</div>';
      domString += '<div id="new-vendor-form-containter"></div>';
      domString += '<div id="update-vendor-form-containter"></div>';
      domString += '<div id="edit-form-container"></div>';
      domString += '<div class="d-flex flex-wrap ml-2">';

      vendors.forEach((vendor) => {
        domString += `<div class="card col-md-3 m-2 ${vendor.isOpen ? '' : 'bg-danger'}" id="${vendor.id}">`;
        domString += '  <div class="card-body text-center">';
        domString += `    <h5 class="card-title">${vendor.name}</h5>`;
        if (vendor.isOpen === false) {
          domString += '<p class="text-danger">Closed</p>';
        }
        domString += `    <p class="card-text">${vendor.description}</p>`;
        domString += '    <button class="btn btn-danger delete-vendor-btn">Delete</button>';
        domString += '    <button class="btn btn-danger update-vendor-btn" type="button" data-toggle="collapse" data-target="#update-vendor-form" aria-expanded="false" aria-controls="updateVendorForm">Edit</button>';
        domString += '  </div>';
        domString += '</div>';
      });

      domString += '</div>';

      utils.printToDom('vendors-dashboard', domString);
    })
    .catch((err) => console.error('problem with get vendors in print vendors', err));
};

export default {
  printVendorsDashboard,
  deleteVendorEvent,
  newVendorEvent,
  updateVendorEvent,
  newVendorFormEvent,
  updateVendorFormEvent,
};

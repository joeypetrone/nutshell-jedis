import firebase from 'firebase/app';
import 'firebase/auth';
import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';

const showEditForm = () => {
  $('div#edit-staff-form-container').removeClass('hide');
  $('div#new-staff-form-container').addClass('hide');
};

const newStaffForm = () => {
  let domString = '';
  domString += '<div class="card form-card col-6 offset-3">';
  domString += '<div class="card-header text-center">';
  domString += '<h2>New Staff Member</h2>';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<form class="new-staff-form">';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-name">Name</label>';
  domString += '<input type="text" class="form-control" id="new-staff-name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-image">Image Url</label>';
  domString += '<input type="text" class="form-control" id="new-staff-image">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="new-staff-type">Job</label>';
  domString += '<input type="text" class="form-control" id="new-staff-job">';
  domString += '</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosKidnapped" id="newStaffRadiosKidnapped" value="true">';
  domString += '<label class="form-check-label" for="newStaffRadiosKidnapped">Kidnapped!</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosKidnapped" id="newStaffRadiosKidnapped" value="false">';
  domString += '<label class="form-check-label" for="newStaffRadiosKidnapped">NOT Kidnapped</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosEmployee" id="newStaffRadiosEmployee" value="true">';
  domString += '<label class="form-check-label" for="newStaffRadiosEmployee">Employee of the Month!</div>';
  domString += '<div class="form-check">';
  domString += '<input class="form-check-input" type="radio" name="newStaffRadiosEmployee" id="newStaffRadiosEmployee" value="false">';
  domString += '<label class="form-check-label" for="newStaffRadiosEmployee">NOT Employee of the Month</div>';
  domString += '</div>';
  domString += '<div class="card-footer text-center">';
  domString += '<button type="submit" class="btn btn-outline-success" id="submit-new-staff">Add staff</button>';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';

  utils.printToDom('new-staff-form-container', domString);
};

const showStaffForm = () => {
  $('#new-staff-form-container').removeClass('hide');
  $('#edit-staff-form-container').addClass('hide');

  newStaffForm();
};

const editStaffForm = (staffId) => {
  showEditForm();
  staffData.getSingleStaffMemeber(staffId)
    .then((response) => {
      const staff = response.data;
      let domString = '';
      domString += '<div class="card form-card col-6 offset-3">';
      domString += '<div class="card-header text-center">';
      domString += '<h2>Edit staff</h2>';
      domString += '</div>';
      domString += '<div class="card-body">';
      domString += `<form class="edit-staff-form" id=${staffId}>`;
      domString += '<div class="form-group">';
      domString += '<label for="staff-name">Name</label>';
      domString += `<input type="text" class="form-control" id="edit-staff-name" value=${staff.name}>`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-staff-image">Image Url</label>';
      domString += `<input type="text" class="form-control" id="edit-staff-image" value=${staff.photoUrl}>`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-staff-type">Job</label>';
      domString += `<input type="text" class="form-control" id="edit-staff-job" value=${staff.job}>`;
      domString += '</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosKidnapped" id="editStaffRadiosKidnapped" value="true">';
      domString += '<label class="form-check-label" for="editStaffRadiosKidnapped">Kidnapped!</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosKidnapped" id="editStaffRadiosKidnapped" value="false">';
      domString += '<label class="form-check-label" for="editStaffRadiosKidnapped">NOT Kidnapped</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosEmployee" id="editStaffRadiosEmployee" value="true">';
      domString += '<label class="form-check-label" for="editStaffRadiosEmployee">Employee of the Month!</div>';
      domString += '<div class="form-check">';
      domString += '<input class="form-check-input" type="radio" name="editStaffRadiosEmployee" id="editStaffRadiosEmployee" value="false">';
      domString += '<label class="form-check-label" for="editStaffRadiosEmployee">NOT Employee of the Month</div>';
      domString += '</div>';
      domString += '<div class="card-footer text-center">';
      domString += '<button type="submit" class="btn btn-outline-success" id="submit-staff-changes">Update</button>';
      domString += '</div>';
      domString += '</form>';
      domString += '</div>';

      utils.printToDom('edit-staff-form-container', domString);
    });
};

const editStaffEvent = (e) => {
  e.preventDefault();
  const staffId = e.target.closest('.card').id;
  editStaffForm(staffId);
};

const printStaff = (staff) => {
  let domString = '';
  domString += '<div class="col-lg-4 col-md-6">';
  domString += `<div id="${staff.id}" class="card text-center my-2 ${staff.isKidnapped ? 'bg-danger' : 'bg-info'}">`;
  domString += '<div class="card-header">';
  domString += `<h3 class="card-title">${staff.name}</h3>`;
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += '<div>';
  domString += `<img class="card-img-top img-fluid cards-image" src="${staff.photoUrl}" alt="Card image cap">`;
  domString += '</div>';
  domString += '<p class="card-text mt-3">';
  domString += staff.isKidnapped ? `${staff.name} is missing!` : `${staff.name} is accounted for.`;
  domString += '</p>';
  domString += '<p class="card-text mt-3">';
  domString += staff.isEOTM ? `Congrats ${staff.name} for being our Employee of the Month!` : '';
  domString += '</p>';
  domString += '</div>';
  domString += '<div class="card-footer">';
  domString += '<button class="btn card-btn mx-1 btn-outline-danger delete-staff"><i class="fas fa-trash card-icon"></i></button>';
  domString += '<button class="btn card-btn mx-1 btn-outline-success edit-staff">';
  domString += '<i class="fas fa-pencil-alt card-icon"></i>';
  domString += '</button>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

const printStaffDashboard = () => {
  staffData.getStaffs()
    .then((staffs) => {
      let domString = '';
      domString += '<div class="d-flex flex-wrap">';
      domString += '<div class="col-12 text-center"><h1 class="my-3">[ Staff ]</h1></div>';
      domString += '<div class="col-12 text-center"><button id="new-staff-btn" class="btn dashboard-btn mb-2">';
      domString += '<i class="fas fa-plus dashboard-icon"></i></button></div>';
      domString += '<div id="edit-staff-form-container" class="col-12 my-3 hide">';
      domString += '</div>';
      domString += '<div id="new-staff-form-container" class="col-12 my-3 hide">';
      domString += '</div>';
      staffs.forEach((staff) => {
        if (staff) domString += printStaff(staff);
      });
      domString += '</div>';
      utils.printToDom('staff-dashboard', domString);
    })
    .catch((err) => console.error('printStaffDashboard broke', err));
};


const makeNewStaff = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isKidnappedBool = $("input[name='newStaffRadiosKidnapped']:checked").val();
  const isEotmBool = $("input[name='newStaffRadiosEmployee']:checked").val();
  const newStaff = {
    name: $('#new-staff-name').val(),
    photoUrl: $('#new-staff-image').val(),
    job: $('#new-staff-job').val(),
    isKidnapped: JSON.parse(isKidnappedBool),
    isEOTM: JSON.parse(isEotmBool),
    uid: myUid,
  };
  staffData.addStaff(newStaff).then(() => printStaffDashboard())
    .catch((err) => console.error('makeNewstaff broke', err));
};

const modifyStaff = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const isKidnappedBool = $("input[name='editStaffRadiosKidnapped']:checked").val();
  const isEotmBool = $("input[name='editStaffRadiosEmployee']:checked").val();
  const staffId = $('.edit-staff-form').attr('id');
  const modifiedStaff = {
    name: $('#edit-staff-name').val(),
    photoUrl: $('#edit-staff-image').val(),
    job: $('#edit-staff-job').val(),
    isKidnapped: JSON.parse(isKidnappedBool),
    isEOTM: JSON.parse(isEotmBool),
    uid: myUid,
  };
  utils.printToDom('edit-form-container', '');
  staffData.updateStaff(staffId, modifiedStaff)
    .then(() => printStaffDashboard())
    .catch((err) => console.error('Modify Pin Broke', err));
};

const removeStaff = (e) => {
  const staffId = e.target.closest('.card').id;
  staffData.deleteStaff(staffId).then(() => printStaffDashboard())
    .catch((err) => console.error('could not delete staff', err));
};

const staffEvents = () => {
  $('body').on('click', '.edit-staff', editStaffEvent);
  $('body').on('click', '#submit-staff-changes', modifyStaff);
  $('body').on('click', '.delete-staff', removeStaff);
  $('body').on('click', '#new-staff-btn', showStaffForm);
  $('body').on('click', '#submit-new-staff', makeNewStaff);
};

export default {
  printStaffDashboard,
  makeNewStaff,
  newStaffForm,
  editStaffForm,
  editStaffEvent,
  modifyStaff,
  removeStaff,
  staffEvents,
};

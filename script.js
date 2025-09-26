$(document).ready(function () {
  // === Handle enabling/disabling date & time fields ===
  $(".activity").change(function () {
    let activityId = $(this).attr("id");

    if ($(this).is(":checked")) {
      // Enable date & time inputs
      $(`.activity-date[data-for=${activityId}]`).prop("disabled", false);
      $(`.activity-time[data-for=${activityId}]`).prop("disabled", false);
    } else {
      // Disable and reset if unchecked
      $(`.activity-date[data-for=${activityId}]`).prop("disabled", true).val("");
      $(`.activity-time[data-for=${activityId}]`).prop("disabled", true).val("");
    }

    updateBudget();
  });

  // === Update budget whenever hotel/transport is changed ===
  $("#hotel, #transport").change(function () {
    updateBudget();
  });

  // === Budget Calculation ===
  function updateBudget() {
    let total = 0;

    // Hotel
    total += parseInt($("#hotel").val());

    // Transport
    total += parseInt($("#transport").val());

    // Activities
    $(".activity:checked").each(function () {
      total += parseInt($(this).val());
    });

    $("#budget").text(total);
  }

  // === Generate Trip Button ===
  $("#generateTrip").click(function () {
    let destination = $("#destination").val();
    let hotel = $("#hotel option:selected").text();
    let transport = $("#transport option:selected").text();
    let itineraryText = "";

    if (!destination) {
      alert("Please select a destination!");
      return;
    }

    itineraryText += `🌍 Destination: ${destination}\n`;
    itineraryText += `🏨 Hotel: ${hotel}\n`;
    itineraryText += `🚗 Transport: ${transport}\n\n`;
    itineraryText += `📅 Activities:\n`;

    $(".activity:checked").each(function () {
      let activityId = $(this).attr("id");
      let activityName = $(this).next("label").text();
      let date = $(`.activity-date[data-for=${activityId}]`).val();
      let time = $(`.activity-time[data-for=${activityId}]`).val();

      itineraryText += `- ${activityName}`;
      if (date) itineraryText += ` on ${date}`;
      if (time) itineraryText += ` at ${time}`;
      itineraryText += `\n`;
    });

    itineraryText += `\n💰 Total Cost: $${$("#budget").text()}`;

    $("#itinerary").val(itineraryText);
  });
});

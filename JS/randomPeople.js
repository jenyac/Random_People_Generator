$(document).ready(function () {
  console.log("js is ready");
  $("#container-2").hide();

  const personCard = `<div class="card mb-2">
<div class="card-body">
    <div class="row g-0">
        <div class="col text-center">
            <div><img src="{{picture}}"></div>
            <div><h5>{{name}} ({{gender}})</h5> </div>
            <div><strong>Age:</strong> {{age}}</div>
            <div><strong>DOB:</strong> {{dob}}</div>
            <div><strong>P: </strong>{{phone}}</div>
            <div><strong>Email: </strong>{{email}}</div>
            <div><strong>Address: </strong>{{address}}</div>
        </div>
    </div>
</div>
</div>`;

  const rootUrl = `https://randomuser.me/api`;
  const getPeople = (count, gender) => {
    return $.get(`${rootUrl}/?results=${count}&gender=${gender}`);
  };

  const renderPeople = (resultCard, people) => {
    console.log(people);
    resultCard.empty();

    for (const p of people) {
      let pCard = personCard.replace(`{{picture}}`, p.picture.large);
      pCard = pCard.replace(`{{name}}`, `${p.name.last} ${p.name.first}`);
      pCard = pCard.replace(`{{gender}}`, p.gender);
      pCard = pCard.replace(`{{age}}`, p.dob.age);
      pCard = pCard.replace(`{{dob}}`, p.dob.date.slice(0, 10));
      pCard = pCard.replace(`{{phone}}`, p.phone);
      pCard = pCard.replace(`{{email}}`, p.email);
      pCard = pCard.replace(
        `{{address}}`,
        `${p.location.street.number} ${p.location.street.name}, 
        ${p.location.country}, ${p.location.city}, ${p.location.state} ${p.location.postcode}`
      );
      resultCard.append(pCard);
    }
  };

  $(function () {
    const numberOfPeople = $("#numberOfPeople");
    const getBtn = $(`#btn-All`);
    const getBtnFemale = $(`#btn-Females`);
    const getBtnMale = $(`#btn-Males`);
    const resultCard = $(`#result-card`);
    const getBtnClearResult = $(`#btn-Clear`);

    getBtn.on("click", (e) => {
      e.preventDefault();
      console.log(e);

      if (numberOfPeople.val() == "" || numberOfPeople.val() == "0") {
        $("#msg").show();
        $("#container-2").hide();
      } else {
        $("#container-2").show();
        getPeople(numberOfPeople.val(), null).then((people) =>
          renderPeople(resultCard, people.results)
        );
      }
    });

    getBtnFemale.on("click", (e) => {
      e.preventDefault();
      console.log(e);

      if (numberOfPeople.val() == "" || numberOfPeople.val() == "0") {
        $("#msg").show();
        $("#container-2").hide();
      } else {
        $("#container-2").show();
        const g = getBtnFemale.data(`female`);
        getPeople(numberOfPeople.val(), g, resultCard).then((people) =>
          renderPeople(resultCard, people.results)
        );
        console.log(g);
      }
    });

    getBtnMale.on("click", (e) => {
      e.preventDefault();
      console.log(e);

      if (numberOfPeople.val() == "" || numberOfPeople.val() == "0") {
        $("#msg").show();
        $("#container-2").hide();
      } else {
        $("#container-2").show();
        const g = getBtnMale.data(`male`);
        getPeople(numberOfPeople.val(), g, resultCard).then((people) =>
          renderPeople(resultCard, people.results)
        );
        console.log(g);
      }
    });

    getBtnClearResult.on("click", (e)=>{
      e.preventDefault();
      console.log(e);
      $("#result-card div").remove();
      $("#container-2").hide();
      $("#numberOfPeople").val("");
      $("#msg").hide();
    })
  });

  $("#numberOfPeople").on("keydown", function (e) {
    if ((e.which >= 48 && e.which <= 57) || e.which == 8) {
      return true;
    }
    return false;
  });
});

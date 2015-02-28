$( document ).ready(function() {

  var tweet = $('#tweet'),
      labelNameInput   = $('#labelName'),
      mappingInput     = $('#labelValueToKeyMap'),
      setMappingButton = $('setMapping');

  var labelName  = undefined,
      keyMapping = undefined;


  function handleKeyUp(event) {
    var keyCode = event.which,
        keyChar = String.fromCharCode(keyCode),
        postParam;

    if (!(labelName && keyMapping)) {
      alert('You must first set the key mapping.');
      return;
    }

    if ((keyChar in keyMapping) || (keyChar === ' '))  {

      if (keyChar === ' ') {
        console.debug("Skipping this tweet."); 
        postParam = {};
      } else {
        postParam = { labelName: labelName, labelValue: keyMapping[keyChar] };
        console.debug("Sending this post param for labeling: " + JSON.stringify(postParam)); 
      }

      $.ajax({
        type: "POST",
        url: "/applyLabel",
        data: JSON.stringify(postParam),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          if (data.message) console.debug("DEBUG: server says... " + data.message);

          if (data.tweet) {
            tweet.html(data.tweet);
          } else {
            tweet.remove(); //All tweets labeled.
            alert("Finito, amigo.")
          }
        },
        failure: function(errMsg) {
          alert(errMsg);
        }
      });

    } else {
      console.debug("DEBUG: '" + keyChar + "' is not in the mapping.")
    }
  };

   
  tweet.hover(
    function () { 
      $(document).keyup(handleKeyUp); 
      tweet.addClass('active');
    },
    function () { 
      $(document).unbind("keyup", handleKeyUp); 
      tweet.removeClass('active');
    }
  );

  labelNameInput.watermark("Label Name");

  mappingInput.watermark("Key to LabelValue (eg: {z:0, m:1})");

  $('#setMapping').click(function (event) {
    event.preventDefault();

    this.blur();

    try {
      labelName = labelNameInput.val();
      keyMapping = $.parseJSON(mappingInput.val());
      
      console.debug("Key to label mapping set to: " + JSON.stringify(keyMapping));
      console.debug("Use the space key to skip labelling a tweet.");
    } 
    catch(error) {
      alert(error);
      console.error(error);
      labelName  = undefined;
      keyMapping = undefined;
    }
  });
});




<!DOCTYPE html>
<html>
	<?php require 'resources/uiConfig.php';?>
	<head>
		<title><?php echo $title; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
		<link rel="stylesheet" href="css\style.css">
		<link rel="stylesheet" href="css\modal.css">
	</head>
	<body onresize="fixHeight()">
		
		<div class="oneTenth pageHead">
			<div class="">
				<h2><?php echo $header; ?></h2>
			</div>
		</div>

		<div class="wrapper ninety" id="container">
			<div class="leftBar full" id="leftBar" style="display: none;">
				<div class="titleBorder"style="font-weight: bold;">
					<button id="addPerson" class="staggeredButtons" style="background-color: red;">Add person</button>
					<br />
				<?php echo $leftBar; ?></div>
				<br />
				<div id="array_of_people"></div>
				<div id="array_of_people_today"></div>
			</div>
			<div class="mainBody full" id="body">
				<div class=""> 
					<table style="width: 100%;"> <tr>
						<td><div id="showHidePeople" class="button">show/hide people</div></td>
						<td><h3 class=""><?php echo $viewportTitle; ?></h3></td>
						<td><div id="showHideEvents" class="button">show/hide events</div></td>
					</tr></table>
				</div>
				<div id="dueToday"></div>
				<div>
					<textarea style="display: flex; height: 85vh; width: 100%; background-color: #1D252B; color: white;"></textarea>
				</div>
				<a href="mailto:" style="width: 100%; display: none;"><button style="width: 100%; background-color: red;">>send it!<</button></a>
			</div>
			<div class="rightBar full" id="rightBar" style="display: none;">
				<button id="addEvent" class="staggeredButtons" style="background-color: red;">Add Event</button>
				<div class="titleBorder" style="font-weight: bold;"><?php echo $rightBar; ?></div>
				<br />
				<div id="array_of_events"></div>
			</div>
		</div>
		<div id="addPersonModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<span class="close">&times;</span>
				<div>
					<h3 style="text-align: center;" class="topAndBottomBorder">Add person...</h3>
					<div> <br />
						<table>
							<tr>
								<td>
									<label for="newPerson">Keep in touch with: </label>
								</td><td>
								<input id="newPerson" type="text" name="newPerson">
							</td>
						</tr>
						<tr>
							<td>
								<label for="frequency" style="display: inline;"> how often? Every:</label>
							</td><td>
							<input id="freqNum" type="number" name="frequency" style="display: inline;">
							<select id="freqSelect">
								<option value="0">Select...</option>
								<option value="1">days</option>
								<option value="2">weeks</option>
								<option value="3">months</option>
								<option value="4">years</option>
							</select>
						</td>
					</tr>
				</table>
				<br/>
				<div style="text-align: center;" class="topAndBottomBorder"><label>let's put down their email. You can add other channels later if you want</label></div>
				<br/>
				<input id="emailId" type="email" name="personEmail" placeholder="email...">
				<button id="add_person_submission" type="submit" style="float: right;" >add...</button><br />
			</div>
				</div>
			</div>
		</div>
		<div id="addEventModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<span class="close">&times;</span>
				<div style="padding-bottom: 15px; width: 100%;">
					<h3 style="text-align: center;" class="topAndBottomBorder">Add event...</h3>
					<div>
						<div style="width: 95%">
							<input id="eventSubject" style="width: 100%; padding-bottom: 3%; display: inline-block;" placeholder="short version: five words or less that you'll remember" />

							<textarea id="eventText" style="width: 103%; margin-top: 5px; margin-bottom: 5px; display: inline-block;" placeholder="a slightly longer version of the event ~400 characters or less"></textarea>
							
							<div style="float: left; display: flex;"><div style="display: flex" id="charCount">0</div><div style="display: flex">/400</div></div>

							<button id="add_event_submission" type="submit" style="float: right; margin-right: -1em;">add...</button>

							<button style="visibility: hidden;" disabled="true">add...</button>

							<br />

						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="wrapper ninety modal" id="login_signup" style="display: none;">
			<div class="modal-content">
				<div style="padding-bottom: 15px; width: 100%;">
					<h3 style="text-align: center;" class="topAndBottomBorder">Log In or Sign Up...</h3>
					<div>
						<div style="width: 95%">
							<input id="username" style="width: 100%; padding-bottom: 3%; display: inline-block;" type="text" />

							<input id="userPass" style="width: 100%; margin-top: 5px; margin-bottom: 5px; display: inline-block;" type="password" />
							
							<button id="login_btn" type="submit" style="float: right; margin-right: -1em;">log in...</button>

							<button id="signup_btn" style="float: left; margin-left: 1em;" >sign up...</button>

							<br />

						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
<script type="text/javascript">
	function fixHeight(){
	}
</script>
<script type="text/javascript" src="js\helper.js"></script>
<script type="text/javascript" src="js\modal.js"></script>
<script type="text/javascript" src="js\app.js"></script>
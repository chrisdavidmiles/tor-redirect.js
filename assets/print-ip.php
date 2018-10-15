<?php
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
	$visitor_ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	$visitor_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
	$visitor_ip = $_SERVER['REMOTE_ADDR'];
}
echo '<script type="text/javascript">var vip = "' . $visitor_ip . '";</script>';
?>

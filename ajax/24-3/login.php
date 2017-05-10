<?php $username=$_POST['username']; $password=$_POST['password'];
$usermsg =array( 'fhw7328126' => '7328126', 'fhwlmmz' => 'feng7328126', 'dearmmz' => '123456', 'rooter' => 'dd', ); $gouwuche=array( 'fhw7328126' => 2, 'fhwlovemmz' => 3, 'dearmmz' => 8, 'rooter' => 123, ); $name=array( 'fhw7328126' => '鱼鱼风', 'fhwmmz' => '黄翔', 'dearmmz' => '明珠', 'rooter' => '管理员', );
 $type=0;
 $gouwuchenum=0;
 $name2=0;
 foreach($usermsg as $key => $value){
 if($username==$key and $password==$value){
 $type=1;
 $gouwuchenum=$gouwuche[$key]; 
 $name2=$name[$key];
 break;
 } else if($username==$key and $password!=$value){
 $type=2;
 break; } }
 $response=array(
 'type' => $type,
 'gouwuchenum' =>$gouwuchenum,
 'name' => $name2,
 ); echo json_encode($response);
 ?>
<?php
include 'koneksi.php';

$data = json_decode(file_get_contents("php://input"), true);

$pickup = $data['pickupDate'];
$return = $data['returnDate'];
$duration = $data['duration'];
$payment = $data['payment'];
$subtotal = $data['subtotal'];
$admin = $data['adminFee'];
$total = $data['total'];

$stmt = $conn->prepare("INSERT INTO orders (pickup_date, return_date, duration, payment_method, subtotal, admin_fee, total) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssissii", $pickup, $return, $duration, $payment, $subtotal, $admin, $total);
$stmt->execute();
$order_id = $stmt->insert_id;

// Simpan item satu per satu
foreach ($data['items'] as $item) {
    $stmt2 = $conn->prepare("INSERT INTO order_items (order_id, item_name, quantity, price, total) VALUES (?, ?, ?, ?, ?)");
    $stmt2->bind_param("isiii", $order_id, $item['name'], $item['quantity'], $item['price'], $item['total']);
    $stmt2->execute();
}

echo json_encode(["success" => true, "order_id" => $order_id]);
?>

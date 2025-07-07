<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "atap_bumi");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Data tidak ditemukan']);
    exit;
}

$order_number = $data['orderNumber'];
$tanggal_order = date('Y-m-d');
$tanggal_ambil = date('Y-m-d', strtotime($data['pickupDate']));
$durasi = $data['duration'];
$metode = $data['payment'];
$subtotal = $data['subtotal'];
$admin_fee = $data['adminFee'];
$total = $data['total'];
$status = $data['status'];
$items = json_encode($data['items']);

$stmt = $conn->prepare("INSERT INTO pesanan 
(order_number, tanggal_order, tanggal_ambil, durasi, metode_pembayaran, subtotal, admin_fee, total, status, items)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssssssss", $order_number, $tanggal_order, $tanggal_ambil, $durasi, $metode, $subtotal, $admin_fee, $total, $status, $items);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>

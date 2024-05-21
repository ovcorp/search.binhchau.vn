<?php
// Tạo sản phẩm đã xem cho flatsome & theme wordpress
function isures_set_user_visited_product_cookie()
{
if (!is_singular('product')) {
return;
}

global $post;

if (empty($_COOKIE['woocommerce_recently_viewed'])) {
$viewed_products = array();
} else {
$viewed_products = wp_parse_id_list((array) explode('|', wp_unslash($_COOKIE['woocommerce_recently_viewed'])));
}

$keys = array_flip($viewed_products);

if (isset($keys[$post->ID])) {
unset($viewed_products[$keys[$post->ID]]);
}

$viewed_products[] = $post->ID;

if (count($viewed_products) > 22) {
array_shift($viewed_products);
}

wc_setcookie('woocommerce_recently_viewed', implode('|', $viewed_products));
}
add_action('wp', 'isures_set_user_visited_product_cookie');

add_shortcode('isures_recently_viewed_products', 'isures_2718_prod_viewed_atts');


function isures_2718_prod_viewed_atts()
{
ob_start();
$viewed_products = !empty($_COOKIE['woocommerce_recently_viewed']) ? (array) explode('|',
wp_unslash($_COOKIE['woocommerce_recently_viewed'])) : array();
$viewed_products = array_reverse(array_filter(array_map('absint', $viewed_products)));

?>
<div id="isures-recently--wrap">

  <div class="isures-container">
    <?php
            if (!empty($viewed_products)) {
               echo do_shortcode('[products type="row" limit="8" columns="5" ids="' . implode(',', $viewed_products) . '"]');
            } else {
                echo 'Không có sản phẩm xem gần đây';
            }
 
            ?>
  </div>
</div>

<?php
    return ob_get_clean();
}
// END ====Tạo sản phẩm đã xem cho flatsome & theme wordpress
?>
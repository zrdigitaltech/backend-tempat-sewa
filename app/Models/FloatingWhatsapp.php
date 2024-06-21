<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="FloatingWhatsapp",
 *     type="object",
 *     title="Floating Whatsapp",
 *     required={"id", "avatar", "phone_number", "account_name", "chat_message", "status_message"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the floating WhatsApp"
 *     ),
 *     @OA\Property(
 *         property="avatar",
 *         type="string",
 *         format="binary",
 *         description="Avatar image URL for the floating WhatsApp"
 *     ),
 *     @OA\Property(
 *         property="phone_number",
 *         type="string",
 *         description="Phone number for the WhatsApp account"
 *     ),
 *     @OA\Property(
 *         property="account_name",
 *         type="string",
 *         description="Name of the WhatsApp account"
 *     ),
 *     @OA\Property(
 *         property="chat_message",
 *         type="string",
 *         description="Default chat message to be sent"
 *     ),
 *     @OA\Property(
 *         property="status_message",
 *         type="string",
 *         description="Status message for the WhatsApp account"
 *     )
 * )
 */
class FloatingWhatsapp extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'avatar',
        'phone_number',
        'account_name',
        'chat_message',
        'status_message',
    ];
}

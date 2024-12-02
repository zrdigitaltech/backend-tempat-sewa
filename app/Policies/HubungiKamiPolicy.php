<?php

namespace App\Policies;

use App\Models\User;
use App\Models\HubungiKami;
use Illuminate\Auth\Access\HandlesAuthorization;

class HubungiKamiPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view_any_hubungi::kami');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, HubungiKami $hubungiKami): bool
    {
        return $user->can('view_hubungi::kami');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create_hubungi::kami');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, HubungiKami $hubungiKami): bool
    {
        return $user->can('update_hubungi::kami');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, HubungiKami $hubungiKami): bool
    {
        return $user->can('delete_hubungi::kami');
    }

    /**
     * Determine whether the user can bulk delete.
     */
    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_hubungi::kami');
    }

    /**
     * Determine whether the user can permanently delete.
     */
    public function forceDelete(User $user, HubungiKami $hubungiKami): bool
    {
        return $user->can('force_delete_hubungi::kami');
    }

    /**
     * Determine whether the user can permanently bulk delete.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->can('force_delete_any_hubungi::kami');
    }

    /**
     * Determine whether the user can restore.
     */
    public function restore(User $user, HubungiKami $hubungiKami): bool
    {
        return $user->can('restore_hubungi::kami');
    }

    /**
     * Determine whether the user can bulk restore.
     */
    public function restoreAny(User $user): bool
    {
        return $user->can('restore_any_hubungi::kami');
    }

    /**
     * Determine whether the user can replicate.
     */
    public function replicate(User $user, HubungiKami $hubungiKami): bool
    {
        return $user->can('replicate_hubungi::kami');
    }

    /**
     * Determine whether the user can reorder.
     */
    public function reorder(User $user): bool
    {
        return $user->can('reorder_hubungi::kami');
    }
}
